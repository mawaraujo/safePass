module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'rules': {
    'require-jsdoc': 'off',
    'linebreak-style': 'off',
    'max-len': 'off',
    'padded-blocks': 'off',
    'valid-jsdoc': 'off',
    'operator-linebreak': 'off',
    'object-curly-spacing': ['error', 'always'],
  },
};
