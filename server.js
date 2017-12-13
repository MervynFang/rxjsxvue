const isProd = process.env.NODE_ENV === 'production'

const path = require('path')
const resolve = file => path.resolve(__dirname, file)

const webpack = require('webpack')
const clientConfig = require('./build/webpack.config')
const opn = require('opn')
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware')

const Koa = require('koa')
const app = new Koa()
const serve = require('koa-static')
const favicon = require('koa-favicon')

if (isProd) {
  app.use(serve(resolve('./dist')))
} else {
  app.use(serve(resolve('./')))
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
  clientConfig.devtool = 'source-map'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )

  const clientCompiler = webpack(clientConfig)

  app.use(devMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  }))
  
  app.use(hotMiddleware(clientCompiler))
}

app.use(favicon(resolve('./src/assets/logo.png')))

const port = process.env.PORT || 3601
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
  const uri = 'http://localhost:' + port
  // will directly open the uri in default browser
  opn(uri)
})