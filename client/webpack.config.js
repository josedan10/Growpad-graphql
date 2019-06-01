const path = require('path')
// const fs = require('fs')

// Plugins
const HtmlWebPackPlugin = require('html-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')

// helpers
// const pagesDir = () => fs.readdirSync(path.join(__dirname, '/src/pages'))
// const objectPages = () => {
//   let pages = {}
//   pagesDir().forEach(file => { pages[file] = path.join(__dirname, '/src/pages', file) })
//   return pages
// }

module.exports = (env, argv) => ({
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
    // chunkFilename: '[name].bundle.js'
  },
  mode: argv.mode,
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: {
              sourceMap: argv.mode === 'development'
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
      },
      {
        test: /\.(graphql|gql)$/,
        use: [
          {
            loader: 'graphql-tag/loader',
            options: {
              // validate: true,
              // schema: "./path/to/schema.json",
              // removeUnusedFragments: true
              // etc. See "Loader Options" below
            }
          }
        ]
      },
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-inline-loader'
      // },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
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
      template: path.join(__dirname, '/public', 'index.html'),
      minify: argv.mode === 'production',
      inject: 'body',
      filename: './index.html'
    })
  ],
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    compress: true,
    historyApiFallback: true
    // port: 8000
    // https: true
  },
  devtool: 'eval-source-map'
})
