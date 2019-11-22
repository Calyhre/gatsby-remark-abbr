module.exports = {
  parser: 'babel-eslint',
  extends: ['eslint:recommended'],

  plugins: ['prettier'],

  env: {
    node: true,
    jest: true,
  },

  rules: {
    'prettier/prettier': 'error',
  },
}
