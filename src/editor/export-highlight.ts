import hljs from 'highlight.js/lib/core';
import go from 'highlight.js/lib/languages/go';
import json from 'highlight.js/lib/languages/json';
import kotlin from 'highlight.js/lib/languages/kotlin';
import python from 'highlight.js/lib/languages/python';
import typescript from 'highlight.js/lib/languages/typescript';

for (const [name, grammar] of Object.entries({ go, json, kotlin, python, typescript })) {
    hljs.registerLanguage(name, grammar);
}

hljs.registerLanguage('func', (hl) => ({
    keywords: 'const int',
    contains: [hl.COMMENT(';;', '$'), hl.C_NUMBER_MODE],
}));

hljs.registerLanguage('tolk', (hl) => ({
    keywords: 'struct type',
    contains: [
        hl.C_LINE_COMMENT_MODE,
        hl.C_BLOCK_COMMENT_MODE,
        hl.C_NUMBER_MODE,
        { scope: 'type', match: /\b(?:[A-Z]\w*|(?:u?int|bits)\d*|cell|slice|string|coins|bool|address|dict)\b/ },
        { scope: 'attr', match: /\b[a-z_]\w*(?=\s*:)/ },
    ],
}));

export function highlightExport(source: string, language: string) {
    return hljs.highlight(source, { language }).value;
}
