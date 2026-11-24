import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { buildParser } from '@lezer/generator';

import samples from '../samples.json';

const parser = buildParser(readFileSync(join(__dirname, 'tlb.grammar'), 'utf8'));

describe('TL-B editor grammar', () => {
    it.each(samples)('highlights $title without syntax recovery', ({ schema }) => {
        const errors: number[] = [];
        parser.parse(schema).iterate({
            enter(node) {
                if (node.type.isError) errors.push(node.from);
            },
        });
        expect(errors).toEqual([]);
    });
    it('keeps partial hexadecimal tags and multiline comments as whole tokens', () => {
        const schema = '/* first\n ** second **/ vm_stk_int#0201_ value:int257 = VmStackValue;';
        const tree = parser.parse(schema);
        for (const [text, name] of [
            ['/* first\n ** second **/', 'BlockComment'],
            ['#0201_', 'Tag'],
        ]) {
            const node = tree.resolve(schema.indexOf(text) + 1);
            expect(node.name).toBe(name);
            expect(schema.slice(node.from, node.to)).toBe(text);
        }
    });
});
