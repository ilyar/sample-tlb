import { Cell } from '@ton/core';

import { readBocRoots } from './cell-processor';

function count(n: number, word: string) {
    return `${n} ${word}${n === 1 ? '' : 's'}`;
}

export class CellInspector {
    private readonly panel = document.querySelector<HTMLDetailsElement>('#cell-inspector')!;
    private readonly stats = document.querySelector<HTMLElement>('#cell-stats')!;
    private readonly list = document.querySelector<HTMLOListElement>('#cell-list')!;
    private raw?: string;
    private roots: Cell[] = [];
    private cells: Cell[] = [];
    private indices = new Map<string, number>();

    constructor() {
        this.panel.addEventListener('toggle', () => this.renderCells());
    }

    update(raw: string) {
        if (this.raw === raw) return;
        this.raw = raw;
        this.roots = [];
        this.cells = [];
        this.indices.clear();
        this.list.replaceChildren();
        try {
            this.roots = readBocRoots(raw);
        } catch {
            // Invalid and partially edited input has no cell structure to inspect.
        }
        this.panel.hidden = this.roots.length === 0;
        if (this.panel.hidden) {
            this.stats.textContent = '';
            return;
        }

        const add = (cell: Cell) => {
            const key = cell.hash().toString('hex');
            if (this.indices.has(key)) return;
            this.indices.set(key, this.cells.length);
            this.cells.push(cell);
        };
        this.roots.forEach(add);
        for (const cell of this.cells) cell.refs.forEach(add);
        this.stats.textContent =
            this.roots.length === 1
                ? `${count(this.cells.length, 'cell')} · root: ${count(this.roots[0].bits.length, 'bit')} · ${count(this.roots[0].refs.length, 'ref')}`
                : `${count(this.cells.length, 'cell')} · ${count(this.roots.length, 'root')}`;
        this.renderCells();
    }

    private renderCells() {
        if (!this.panel.open || this.panel.hidden || this.list.childElementCount) return;
        const rootKeys = new Set(this.roots.map((root) => root.hash().toString('hex')));
        const rows = document.createDocumentFragment();
        for (const [index, cell] of this.cells.entries()) {
            const key = cell.hash().toString('hex');
            const row = document.createElement('li');
            row.tabIndex = -1;
            const label = document.createElement('strong');
            label.textContent = `#${index}${rootKeys.has(key) ? ' · Root' : ''}`;
            const size = document.createElement('span');
            size.textContent = count(cell.bits.length, 'bit');
            const hex = document.createElement('code');
            hex.textContent = `x{${cell.bits.toString()}}`;
            row.append(label, size, hex);
            if (cell.refs.length) {
                const refs = document.createElement('small');
                refs.textContent = 'Refs → ';
                for (const ref of cell.refs) {
                    const destination = this.indices.get(ref.hash().toString('hex'))!;
                    const link = document.createElement('button');
                    link.type = 'button';
                    link.textContent = '#' + destination;
                    link.setAttribute('aria-label', 'Go to cell ' + destination);
                    link.addEventListener('click', () => {
                        const target = this.list.children[destination] as HTMLElement;
                        target.focus();
                    });
                    refs.append(link);
                }
                row.append(refs);
            }
            rows.append(row);
        }
        this.list.append(rows);
    }
}
