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
                document: 'readonly',
                HTMLTextAreaElement: 'readonly',
                HTMLSpanElement: 'readonly',
                HTMLInputElement: 'readonly',
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
