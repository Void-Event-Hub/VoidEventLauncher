module.exports = {
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 2022,
    },
    rules: {
        // This will ensure ESLint doesn't conflict with Prettier's quote formatting
        quotes: ['error', 'single', { avoidEscape: true }],
    },
}
