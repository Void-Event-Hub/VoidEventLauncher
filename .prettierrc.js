module.exports = {
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 120,
    tabWidth: 4,
    semi: false,
    endOfLine: 'crlf',
    arrowParens: 'avoid',
    bracketSpacing: true,
    quoteProps: 'preserve',
    jsxSingleQuote: true,
    // Disable Prettier's string formatting altogether
    embeddedLanguageFormatting: 'off',
    // // Custom parser to preserve escaped quotes
    // overrides: [
    //     {
    //         files: ['app/assets/js/scripts/uicore.js'],
    //         options: {
    //             requirePragma: true,
    //         },
    //     },
    // ],
}
