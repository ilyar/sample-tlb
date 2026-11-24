import { Cell } from '@ton/core';
import { Result, TLBConstructor, TLBRuntime, TypedCell } from '@ton-community/tlb-runtime';

export interface DecodeChoice {
    label: string;
    root: string;
    args: (number | string)[];
    kind: string;
    value?: TypedCell;
}

// Keep expressions such as (n + 2) together. Leading ~ marks an output parameter.
function inputArgs(c: TLBConstructor): (string | number)[] {
    const result = c.declaration
        .slice(c.declaration.lastIndexOf('=') + 1)
        .trim()
        .replace(/;$/, '');
    let depth = 0;
    let token = '';
    const tokens: string[] = [];
    for (const ch of result + ' ') {
        if (ch === '(') depth++;
        if (ch === ')') depth--;
        if (/\s/.test(ch) && !depth && token !== '~') {
            if (token) tokens.push(token);
            token = '';
        } else token += ch;
    }
    const args = tokens.slice(1);
    const firstOutput = args.findIndex((arg) => arg.startsWith('~'));
    return args
        .slice(0, firstOutput < 0 ? args.length : firstOutput)
        .map((arg) => (/^\d+$/.test(arg) ? Number(arg) : arg));
}

export function withArguments(runtime: TLBRuntime, cell: Cell, choice: DecodeChoice, args: number[]) {
    const decoded = runtime.decodeCell(cell, { rootType: choice.root, args });
    if (decoded.kind !== choice.kind || !runtime.encodeCell(decoded).equals(cell)) {
        throw new Error('The arguments do not match this cell');
    }
    return decoded;
}

// A referenced type can consume a prefix even when its parent consumes every reference.
function leavesTrailingData(encoded: Cell, wire: Cell): boolean {
    if (encoded.equals(wire)) return false;
    const n = encoded.bits.length;
    if (n > wire.bits.length || encoded.refs.length > wire.refs.length) return false;
    if (n && !encoded.bits.equals(wire.bits.substring(0, n))) return false;
    return (
        n < wire.bits.length ||
        encoded.refs.length < wire.refs.length ||
        encoded.refs.some((ref, i) => leavesTrailingData(ref, wire.refs[i]))
    );
}

export function decodeChoices(runtime: TLBRuntime, cell: Cell): DecodeChoice[] {
    const choices: DecodeChoice[] = [];
    const pending: DecodeChoice[] = [];
    const tagged: DecodeChoice[] = [];
    for (const type of runtime.getTypes().values()) {
        const slice = cell.beginParse();
        const constructors = type.constructors.filter(
            (c) =>
                c.declaration &&
                c.tag.bitLen <= slice.remainingBits &&
                (!c.tag.bitLen || slice.preloadUintBig(c.tag.bitLen) === BigInt(c.tag.binary)),
        );
        if (!constructors.length) continue;
        let plain: Result<TypedCell>;
        try {
            plain = runtime.deserializeByTypeName(type.name, slice) as Result<TypedCell>;
        } catch (error) {
            plain = { success: false, error: error instanceof Error ? error : new Error('Invalid cell') };
        }
        let complete: TypedCell | undefined;
        if (plain.success) {
            // Some Cell fields retain the remaining slice without advancing its cursor.
            try {
                const encoded = runtime.encodeCell(plain.value);
                if (
                    encoded.equals(cell) ||
                    (!slice.remainingBits && !slice.remainingRefs && !leavesTrailingData(encoded, cell))
                )
                    complete = plain.value;
            } catch {
                /* A partial match cannot be used as a root. */
            }
        }
        for (const c of constructors) {
            if (c.parameters.some((p) => p.variable.type === 'Type')) continue;
            const kind = type.constructors.length === 1 ? type.name : type.name + '_' + c.name;
            const args = inputArgs(c);
            const choice: DecodeChoice = { label: [type.name, ...args].join(' '), root: type.name, args, kind };
            if (args.length && args.every((arg): arg is number => typeof arg === 'number')) {
                try {
                    choice.value = withArguments(runtime, cell, choice, args);
                } catch {
                    continue;
                }
            } else if (
                complete?.kind === kind &&
                args.every(
                    (arg, i) => typeof arg === 'number' || typeof complete[c.parameters[i].variable.name] === 'number',
                )
            ) {
                choice.value = complete;
            } else if (args.some((arg) => typeof arg === 'string')) {
                const fields = c.fields.filter((f) => !f.implicit);
                const field = fields.length === 1 ? fields[0].fieldType : undefined;
                if (
                    args.length === 1 &&
                    field?.kind === 'TLBBitsType' &&
                    field.bits.kind === 'TLBVarExpr' &&
                    field.bits.x === args[0]
                ) {
                    try {
                        choice.value = withArguments(runtime, cell, choice, [cell.bits.length - c.tag.bitLen]);
                    } catch {
                        continue;
                    }
                } else if (
                    plain.success
                        ? !complete || complete.kind !== kind
                        : !/variable|parameter|argument/i.test(plain.error.message)
                )
                    continue;
            } else continue;
            if (!choice.value && !complete) {
                pending.push(choice);
                continue;
            }
            choices.push(choice);
            if (c.tag.bitLen) tagged.push(choice);
        }
    }
    // A tag can belong to a nested field of a tagless root (e.g. the Unary sample).
    if (choices.length > 1 && tagged.length === 1 && tagged[0].value) {
        try {
            const inferred = runtime.decodeCell(cell);
            if (inferred.kind === tagged[0].kind) return tagged;
        } catch {
            // Keep the validated choices if the runtime cannot infer the root.
        }
    }
    return choices.length ? choices : pending;
}
