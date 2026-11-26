const base = require('@ton/toolchain');

module.exports = [
    ...base,
    {
        // Keep the checked-in example identical to runtime.toTypeScript().
        files: ['src/share/share.d.ts'],
        rules: { 'prettier/prettier': 'off' },
    },
    {
        files: ['*/*debug*.ts'],
        rules: {
            'no-console': 'off',
        },
    },
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            globals: {
                window: 'readonly',
                URL: 'readonly',
                URLSearchParams: 'readonly',
                document: 'readonly',
                HTMLTextAreaElement: 'readonly',
                HTMLDetailsElement: 'readonly',
                HTMLOListElement: 'readonly',
                HTMLSpanElement: 'readonly',
                HTMLInputElement: 'readonly',
                HTMLSelectElement: 'readonly',
                HTMLAnchorElement: 'readonly',
                HTMLOptGroupElement: 'readonly',
                Option: 'readonly',
                HTMLButtonElement: 'readonly',
                HTMLElement: 'readonly',
                Event: 'readonly',
                EventTarget: 'readonly',
                Node: 'readonly',
                Element: 'readonly',
            },
        },
    },
];
