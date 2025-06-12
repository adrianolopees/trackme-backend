module.exports = {
  parser: '@typescript-eslint/parser', // Usa o parser do TypeScript
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',             // Regras recomendadas do ESLint
    'plugin:@typescript-eslint/recommended', // Regras do TS
    'plugin:prettier/recommended'     // Integra ESLint com Prettier
  ],
  rules: {
    'prettier/prettier': 'error',    // Reporta erros do prettier como erro ESLint
    // Aqui você pode customizar regras, por exemplo:
    // '@typescript-eslint/no-explicit-any': 'warn',
  },
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: ['dist/', 'node_modules/'], // Ignorar essas pastas
};
