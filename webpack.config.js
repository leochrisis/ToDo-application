const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const environment = process.env.NODE_ENV

module.exports = {
  entry: './js/app.js',

  output: {
    path: path.join(__dirname, './js'),
    publicPath: '/js/',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      },

      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              loader: 'css-loader',
              fallbackLoader: 'vue-style-loader'
            }),

            sass: ExtractTextPlugin.extract({
              loader: ['css-loader', 'sass-loader?indentedSyntax'],
              fallbackLoader: 'vue-style-loader'
            })
          }
        }
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('bundle.css')
  ],

  resolve: {
    extensions: ['.js', '.json', '.vue'] 
  },

  stats: environment === 'production' ? 'verbose' : 'errors-only',

  devServer: {
    historyApiFallback: true,
    inline: true
  },

  performance: {
    hints: false
  },

  devtool: '#eval-source-map'
}
