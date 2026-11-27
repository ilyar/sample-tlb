// The local runtime uses this same graph for TypeScript and Draft-07 exports.
import {
    resolveTypeGraph,
    type ResolvedField,
    type ResolvedFieldType,
    type ResolvedType,
    type ResolvedVariant,
} from '@ton-community/tlb-runtime/dist/type-graph';
import type { TLBRuntime, TypeExportOptions } from '@ton-community/tlb-runtime';

export type Language = 'func' | 'tolk' | 'python' | 'go' | 'kotlin';

const reservedTypes: Record<Language, string> = {
    func: '',
    tolk: 'Cell RemainingBitsAndRefs',
    python: 'Literal NotRequired TypedDict Union None True False',
    go: '',
    kotlin: 'Any Array Boolean ByteArray Int List Long Map String',
};

const goInitialisms = new Set(
    'ACL API ASCII CPU CSS DNS EOF GUID HTML HTTP HTTPS ID IP JSON QPS RAM RPC SLA SMTP SQL SSH TCP TLS TTL UDP UI UID URI URL UTF8 UUID VM XML XMPP XSRF XSS'.split(
        ' ',
    ),
);
const kotlinKeywords = new Set(
    'as break class continue do else false for fun if in interface is null object package return super this throw true try typealias typeof val var when while'.split(
        ' ',
    ),
);
const tolkKeywords = new Set(
    'as asm assert break builtin catch const continue do else enum export false fun global if import infix is lazy match mutate null operator private readonly repeat return self struct throw tolk true try type val var while'.split(
        ' ',
    ),
);

function words(value: string): string[] {
    return (
        value
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
            .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
            .match(/[a-zA-Z0-9]+/g) ?? []
    );
}

function identifier(parts: string[], language: Language, field = false): string {
    const name = parts
        .map((word, index) => {
            const lower = word.toLowerCase();
            if (field && index === 0 && language !== 'go') return lower;
            if (language === 'go' && goInitialisms.has(word.toUpperCase())) return word.toUpperCase();
            if (language === 'python' && word === word.toUpperCase()) return word;
            if (language === 'kotlin' && word.length === 2 && word === word.toUpperCase()) return word;
            return capitalized(lower);
        })
        .join('');
    const prefix = field && language !== 'go' ? 'field' : field ? 'Field' : 'Type';
    return !name || /^\d/.test(name) ? prefix + name : name;
}

function allocate(used: Set<string>, base: string) {
    let name = base;
    for (let suffix = 2; used.has(name); suffix++) name = base + suffix;
    used.add(name);
    return name;
}

function capitalized(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function nullable(language: Language, type: string) {
    if (language === 'python') return type + ' | None';
    if (language === 'go') return type.startsWith('*') ? type : '*' + type;
    return type.endsWith('?') ? type : type + '?';
}

export function exportModel<T>(runtime: TLBRuntime<T>, language: Language, options: TypeExportOptions) {
    const graph = resolveTypeGraph(runtime.getTypes(), runtime.lastTypeName, options, runtime.config.autoText);
    const blocks: string[] = [];
    const names = new Map<string, string>();
    const used = new Set(reservedTypes[language].split(' '));
    const imports = new Set<string>();
    const warnings = new Set<string>();

    if (language === 'func') {
        blocks.push(';; See https://docs.ton.org/tolk/from-func/tolk-vs-func');
        for (const type of graph.types.values()) {
            const constructors = runtime.getTypes().get(type.tlbName.split(' ')[0])?.constructors;
            for (const variant of type.variants) {
                const ctor = constructors?.find((c) => c.declaration === variant.declaration);
                const lines = [';; ' + variant.declaration];
                if (ctor?.tag.bitLen) {
                    const stem = words(type.name + '_' + variant.constructorName)
                        .join('_')
                        .toLowerCase();
                    const name = allocate(used, 'tag_' + stem);
                    lines.push(`const int ${name} = ${BigInt(ctor.tag.binary)};  ;; ${ctor.tag.bitLen} bits`);
                }
                blocks.push(lines.join('\n'));
            }
        }
        return blocks.join('\n\n') + '\n';
    }

    function typeName(name: string) {
        return allocate(used, identifier(words(name), language));
    }
    for (const t of graph.types.values()) names.set(t.name, typeName(t.name));

    function modelField(t: ResolvedFieldType, owner: string): string {
        const py = language === 'python',
            go = language === 'go';
        switch (t.kind) {
            case 'ref':
                return (go && graph.types.get(t.target)?.variants.length === 1 ? '*' : '') + names.get(t.target)!;
            case 'boolean':
                return py || go ? 'bool' : 'Boolean';
            case 'number':
                return py ? 'int' : go ? 'int64' : 'Long';
            case 'bigint':
                if (go) imports.add('"math/big"');
                return py ? 'int' : go ? '*big.Int' : 'java.math.BigInteger';
            case 'bits':
                if (t.bitLength === 1) return modelField({ kind: 'boolean' }, owner);
                if (t.bitLength === undefined) return py ? 'bool | str' : go ? 'any' : 'Any';
                return py ? 'str' : go ? 'string' : 'String';
            case 'string':
                return py ? 'str' : go ? 'string' : 'String';
            case 'address':
                return nullable(language, py ? 'str' : go ? 'string' : 'String');
            case 'cell':
                return py ? 'bytes' : go ? '[]byte' : 'ByteArray';
            case 'nullable':
                return nullable(language, modelField(t.inner, owner));
            case 'array':
            case 'tuple': {
                const item = t.kind === 'array' ? modelField(t.item, owner) : modelField({ kind: 'unknown' }, owner);
                return py ? `list[${item}]` : go ? '[]' + item : `List<${item}>`;
            }
            case 'dictionary': {
                const value = modelField(t.value, owner);
                return py ? `dict[int, ${value}]` : go ? 'map[string]' + value : `Map<java.math.BigInteger, ${value}>`;
            }
            case 'object': {
                const name = typeName(owner + 'Fields');
                record(name, t.fields);
                return name;
            }
            case 'unknown':
                return py ? 'object' : go ? 'any' : 'Any?';
        }
    }

    // Inline recursive values cannot inhabit a finite Tolk struct. Preserve the slice
    // for a custom codec; inserting a cell reference here would change its wire format.
    function inlineCycle(target: string, owner: string, seen = new Set<string>()): boolean {
        if (target === owner) return true;
        if (seen.has(target)) return false;
        seen.add(target);
        return (
            graph.types
                .get(target)
                ?.variants.some((v) =>
                    v.fields.some(
                        (f) =>
                            f.type.kind === 'ref' &&
                            !f.tlbType.startsWith('^') &&
                            inlineCycle(f.type.target, owner, seen),
                    ),
                ) ?? false
        );
    }

    function tolkField(field: ResolvedField, owner: string): string {
        const t = field.type;
        const raw = field.tlbType;
        const inner = raw.replace(/^\^/, '');
        if (raw === '^SnakeString') return 'string';
        if (raw === 'SnakeString' || raw === 'Cell' || raw === 'Any') return 'RemainingBitsAndRefs';
        if (raw === '^Cell' || raw === '^Any') return 'cell';
        let type: string;
        if (/^(?:u?int|bits)\d+$/.test(inner)) type = inner;
        else if (t.kind === 'ref' && !raw.startsWith('^') && inlineCycle(t.target, owner)) {
            warnings.add('Inline recursion through ' + raw + ' requires custom packing.');
            type = 'slice';
        } else if (t.kind === 'ref') type = names.get(t.target)!;
        else if (inner === 'Bool') type = 'bool';
        else if (inner === 'Coins' || inner === 'Grams') type = 'coins';
        else if (inner === 'MsgAddressInt') type = 'address';
        else if (inner === '#') type = 'uint32';
        else if (t.kind === 'bits' && t.bitLength) type = 'bits' + t.bitLength;
        else if (t.kind === 'bigint' && t.bitWidth) type = (t.signed ? 'int' : 'uint') + t.bitWidth;
        else if (t.kind === 'number' && t.max !== undefined && t.min !== undefined && t.max > 0) {
            type = (t.min < 0 ? 'int' : 'uint') + (Math.ceil(Math.log2(t.max + 1)) + Number(t.min < 0));
        } else {
            warnings.add('Custom packing is required for ' + raw + '.');
            type = 'slice';
        }
        if (field.optional) warnings.add('Conditional fields require their TL-B presence condition when packing.');
        return raw.startsWith('^') ? `Cell<${type}>` : type;
    }

    function record(
        name: string,
        fields: ResolvedField[],
        variant?: ResolvedVariant,
        parent?: string,
        prefix = '',
        owner = name,
    ) {
        const usedFields = new Set<string>(
            variant && language === 'go' ? ['Kind'] : variant && language === 'kotlin' ? ['kind'] : [],
        );
        const lines = fields.map((f) => {
            const base = identifier(words(f.name), language, true);
            const fieldName = allocate(
                usedFields,
                language === 'tolk' && tolkKeywords.has(base) ? base + 'Field' : base,
            );
            if (language === 'tolk') return `    ${fieldName}: ${tolkField(f, owner)}  // ${f.tlbType}`;
            let type = modelField(f.type, name + capitalized(f.name));
            if (language === 'python')
                return `    ${JSON.stringify(f.name)}: ${f.optional ? 'NotRequired[' + JSON.stringify(type) + ']' : JSON.stringify(type)},`;
            if (f.optional) type = nullable(language, type);
            if (language === 'go')
                return `    ${fieldName} ${type} \`json:"${f.name}${f.optional ? ',omitempty' : ''}"\``;
            const property = kotlinKeywords.has(fieldName) ? '`' + fieldName + '`' : fieldName;
            const source = fieldName === f.name ? '' : `    // TL-B field: ${f.name}\n`;
            return source + `    val ${property}: ${type}${f.optional ? ' = null' : ''}`;
        });
        if (language === 'tolk') blocks.push(`struct ${prefix}${name} {\n${lines.join('\n')}\n}`);
        else if (language === 'python') {
            if (variant) lines.unshift(`    "kind": Literal[${JSON.stringify(variant.kind)}],`);
            blocks.push(`${name} = TypedDict("${name}", {\n${lines.join('\n')}\n})`);
        } else if (language === 'go') {
            if (variant) lines.unshift('    Kind string `json:"kind"` // ' + variant.kind);
            blocks.push(
                `type ${name} struct {\n${lines.join('\n')}\n}` + (parent ? `\nfunc (*${name}) is${parent}() {}` : ''),
            );
        } else {
            const body = variant
                ? ` {\n    ${parent ? 'override ' : ''}val kind: String get() = "${variant.kind}"\n}`
                : '';
            const head = lines.length ? `data class ${name}(\n${lines.join(',\n')}\n)` : `object ${name}`;
            blocks.push(head + (parent ? ' : ' + parent : '') + body);
        }
    }

    function render(t: ResolvedType) {
        const name = names.get(t.name)!;
        if (language === 'tolk' && t.alias?.kind === 'dictionary') {
            blocks.push(`type ${name} = dict`);
            return;
        }
        if (t.alias && language !== 'tolk') {
            const value =
                language === 'python' && t.alias.kind === 'dictionary'
                    ? `dict[int, ${JSON.stringify(modelField(t.alias.value, name))}]`
                    : modelField(t.alias, name);
            blocks.push(
                language === 'go'
                    ? `type ${name} ${value}`
                    : language === 'python'
                      ? `${name} = ${value}`
                      : `typealias ${name} = ${value}`,
            );
            return;
        }
        const union = t.variants.length > 1;
        if (union && language === 'go') blocks.push(`type ${name} interface { is${name}() }`);
        if (union && language === 'kotlin') blocks.push(`sealed interface ${name} { val kind: String }`);
        const variants = t.variants.map((v) => {
            const ctorWords = words(v.constructorName);
            const parentWords = words(t.name);
            const hasPrefix = parentWords.every((word, i) => word.toLowerCase() === ctorWords[i]?.toLowerCase());
            const variant = union ? typeName((hasPrefix ? ctorWords : [...parentWords, ...ctorWords]).join('_')) : name;
            const ctor = runtime
                .getTypes()
                .get(t.tlbName.split(' ')[0])
                ?.constructors.find((c) => c.declaration === v.declaration);
            let fields = v.fields;
            let prefix = '';
            if (language === 'tolk' && ctor) {
                if (ctor.constraints.length || ctor.fields.some((f) => f.subFields.length))
                    warnings.add('Check TL-B constraints and inline groups before packing.');
                // The runtime also exposes inferred parameters in decoded objects. These occupy no bits.
                fields = fields.filter(
                    (f) => !f.optional || ctor.fields.some((src) => !src.implicit && src.name === f.name),
                );
                if (ctor.tag.bitLen)
                    prefix = '(0b' + BigInt(ctor.tag.binary).toString(2).padStart(ctor.tag.bitLen, '0') + ') ';
                else if (union) warnings.add('Untagged TL-B alternatives require custom packing.');
            }
            record(variant, fields, v, union ? name : undefined, prefix, t.name);
            return variant;
        });
        if (union && language === 'python') blocks.push(`${name} = Union[${variants.join(', ')}]`);
        if (union && language === 'tolk') blocks.push(`type ${name} = ${variants.join(' | ')}`);
    }
    for (const t of graph.types.values()) render(t);
    if (language === 'go')
        blocks.unshift('package models' + (imports.size ? '\n\nimport ' + [...imports].join('\n') : ''));
    if (language === 'python') blocks.unshift('from typing import Literal, NotRequired, TypedDict, Union');
    if (language === 'tolk' && warnings.size) blocks.unshift([...warnings].map((w) => '// ' + w).join('\n'));
    if (language === 'tolk') blocks.unshift('// See https://docs.ton.org/tolk/from-func/tolk-vs-tlb');
    return blocks.join('\n\n') + '\n';
}
