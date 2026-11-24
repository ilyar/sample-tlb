import samples from './samples.json';
import { CellProcessor } from './cell-processor';

describe('documentation samples', () => {
    it.each(samples)('$title loads its prepared cell', (sample: { schema: string; boc: string; kind?: string }) => {
        const processor = CellProcessor.from(sample.schema);
        expect(processor.updateBoc(sample.boc).success).toBe(true);
        if (sample.kind) {
            const index = processor.choices.findIndex((choice) => choice.value?.kind === sample.kind);
            expect(index).toBeGreaterThanOrEqual(0);
            expect(processor.selectChoice(index).success).toBe(true);
            expect(JSON.parse(processor.state.data).kind).toBe(sample.kind);
        }
    });
});
