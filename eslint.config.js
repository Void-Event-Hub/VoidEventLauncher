module.exports = [
    {
        ignores: ['dist/'],
        languageOptions: {
            sourceType: 'commonjs',
            ecmaVersion: 2022,
            globals: {
                // ES2022 globals
                // Node globals
                process: 'readonly',
                require: 'readonly',
                module: 'writable',
                __dirname: 'readonly',
                __filename: 'readonly',
                exports: 'writable',
                Buffer: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                console: 'readonly',
                global: 'readonly',
            },
        },
        rules: {
            indent: [
                'error',
                4,
                {
                    SwitchCase: 1,
                },
            ],
            'linebreak-style': ['error', 'windows'],
            quotes: ['error', 'single'],
            semi: ['error', 'never'],
            'no-var': ['error'],
            'no-console': [0],
            'no-control-regex': [0],
            'no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    args: 'none',
                    ignoreRestSiblings: false,
                    argsIgnorePattern: 'reject',
                },
            ],
            'no-async-promise-executor': [0],
        },
    },
    {
        files: ['app/assets/js/scripts/*.js'],
        rules: {
            'no-unused-vars': [0],
            'no-undef': [0],
        },
    },
]
