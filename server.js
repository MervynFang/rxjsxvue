const isProd = process.env.NODE_ENV === 'production'

const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const express = require('express')
const favicon = require('serve-favicon')

const webpack = require('webpack')
const clientConfig = require('./build/webpack.config')

const app = express()

if (isProd) {
  
} else {
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )

  const clientCompiler = webpack(clientConfig)

  app.use(require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  }))
  
  app.use(require('webpack-hot-middleware')(clientCompiler))
}

app.use('/dist', express.static(resolve('./dist')))
app.use(favicon(resolve('./src/assets/logo.png')))

const port = process.env.PORT || 3601
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})