const base = require('@ton/toolchain');

module.exports = [
    ...base,
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
