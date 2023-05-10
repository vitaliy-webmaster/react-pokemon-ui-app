module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  printWidth: 100,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  overrides: [
    {
      files: ['*.css'],
      options: {
        singleQuote: false,
      },
    },
  ],
};
