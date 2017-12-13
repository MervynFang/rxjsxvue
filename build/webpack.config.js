const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = file => path.resolve(__dirname, file)
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const vueConfig = {
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ]
}

const baseConfig = {
  entry: {
    app: './src/app.js',
    vendor: ['vue', 'vue-router', 'rxjs', 'vue-rx']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: process.env.NODE_ENV === 'production' 
      ? '[name]-[chunkhash:10].js' : '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff|eot)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        loader: process.env.NODE_ENV === 'production' 
          ? ExtractTextPlugin.extract({
            use: ['css-loader', 'postcss-loader'],
            fallback: 'style-loader'
          }) 
          : ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  resolve: {
    alias: {
      'src': resolve('../src')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest']
    })
  ]
}

let HWP = {
  filename: 'index.html',
  template: './src/index.html',
  inject: 'body'
}

if (process.env.NODE_ENV === 'production') {
  HWP = Object.assign({}, HWP, {
    minify: {
      collapseWhitespace: true,
      removeComments: true
    }
  })
  
  vueConfig.loaders = {
    css: ExtractTextPlugin.extract({
      use: 'css-loader',
      fallback: 'vue-style-loader'
    })
  }

  baseConfig.plugins.push(
    new ExtractTextPlugin('styles-[contenthash:10].css'),
    // this is needed in webpack 2 for minifying CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // minify JS
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin(HWP)
  )
} else {
  baseConfig.plugins.push(
    new HtmlWebpackPlugin(HWP)
  )
}

module.exports = baseConfig