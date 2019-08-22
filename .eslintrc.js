module.exports = {
  extends: ['prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'max-len': ['error', 80],
  },
  parserOptions: {
    ecmaVersion: 2017,
  },

  env: {
    es6: true,
  },
};
