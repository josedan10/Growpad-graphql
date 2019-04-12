module.exports = {
  extends: [
    'standard',
    'prettier',
    'prettier/react',
    'plugin:react/recommended'
  ],
  plugins: ['prettier'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'react/prop-types': 1,
    'no-underscore-dangle': 0,
    'import/imports-first': ['error', 'absolute-first'],
    'import/newline-after-import': 'error'
  },
  parser: 'babel-eslint'
}
