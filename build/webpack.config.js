const path = require('path')
const projectRoot = path.resolve(__dirname, '../')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const baseConfig = {
  entry: {
    app: './src/app.js',
    vendor: ['vue', 'vue-router']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    // publicPath: '/dist/',
    filename: 'rxjsxvue-bundle.js'
  },
  module: {
    // preloader can lint dependency 
    // other please run npm run lint in terminal
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  vue: {
    postcss: [
      require('autoprefixer')({
        browsers: ['last 3 versions']
      })
    ],
    loaders: {
      
    }
  },
  eslint: {
    
  },
  resolveLoader: {
    root: path.join(__dirname, '../node_modules')
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.ejs', '.json', '.css'],
    alias: {
      
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'client-vendor-bundle.js'
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
  
  baseConfig.vue.loaders = {
    css: ExtractTextPlugin.extract('vue-style-loader', 'css')
  }

  baseConfig.plugins.push(
    new ExtractTextPlugin('styles.css'),
    // this is needed in webpack 2 for minifying CSS
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true
    // }),
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