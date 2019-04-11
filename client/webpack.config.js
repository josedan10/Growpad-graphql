const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = (env, argv) => ({
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  mode: argv.mode,
  module: {
    rules: [
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'sass-loader',
            options: {
              sourceMap: argv.mode === 'development',
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, '/src/index.html'),
      minify: argv.mode === 'production'
      // filename: path.join(__dirname, '/dist/index.html')
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    compress: true,
    port: 8000
  }
})
