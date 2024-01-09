import babel from '@babel/eslint-plugin';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import config from '@ecomfe/eslint-config/strict.js';
import tsConfig from '@ecomfe/eslint-config/typescript/strict.js';

export default [
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: 'tsconfig.json',
            },
        },
        plugins: {
            '@babel': babel,
            '@typescript-eslint': ts,
        },
        rules: {
            ...config.rules,
            ...tsConfig.overrides.at(0).rules,
            'no-unused-expressions': [
                'error',
                {
                    allowTaggedTemplates: true,
                },
            ],
        },
    },
];
