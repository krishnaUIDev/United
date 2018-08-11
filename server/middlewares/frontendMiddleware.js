/* eslint-disable global-require */
const express = require('express')
const path = require('path')
const compression = require('compression')
const pkg = require(path.resolve(process.cwd(), 'package.json'))
const proxy = require('http-proxy-middleware')
const pxhost = process.env.npm_config_pxhost || 'http://dev3.united.com'
// const pxhost = process.env.npm_config_pxhost || 'http://localhost:53986/';
const pxhost2 = 'https://lookup.hotels.com'
const pxhost3 = 'http://localhost:56830'

// Dev middleware
const addDevMiddlewares = (app, webpackConfig) => {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const compiler = webpack(webpackConfig)
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only'
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem

  if (pkg.dllPlugin) {
    app.get(/\.dll\.js$/, (req, res) => {
      const filename = req.path.replace(/^\//, '')
      res.sendFile(path.join(process.cwd(), pkg.dllPlugin.path, filename))
    })
  }

  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404)
      } else {
        res.send(file.toString())
      }
    })
  })
}

// Production middlewares
const addProdMiddlewares = (app, options) => {
  const publicPath = options.publicPath || '/'
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build')

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression())
  app.use(publicPath, express.static(outputPath))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(outputPath, 'index.html'))
  )
}

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd =
    process.env.NODE_ENV === 'production' &&
    process.env.APP_CONFIG !== 'development'

  // test routes
  app.use('/test/400', (req, res) => {
    // console.log('Request Type:', req.method);
    res.sendStatus(400)
  })

  app.use('/test/401', (req, res) => {
    // console.log('Request Type:', req.method);
    res.sendStatus(401)
  })

  app.use('/test/403', (req, res) => {
    // console.log('Request Type:', req.method);
    res.sendStatus(403)
  })

  app.use('/test/423', (req, res) => {
    // console.log('Request Type:', req.method);
    res.sendStatus(423)
  })

  app.use('/test/500', (req, res) => {
    // console.log('Request Type:', req.method);
    res.sendStatus(500)
  })

  app.use('/test/503', (req, res) => {
    // console.log('Request Type:', req.method);
    res.sendStatus(503)
  })

  app.use('/test/long', (req, res) => {
    // console.log('Request Type:', req.method);
    setTimeout(() => {
      res.sendStatus(200)
    }, 60000)
  })

  // Proxy requests
  // app.use('/api', proxy({ target: `${pxhost}`, changeOrigin: true, pathRewrite: { '^/api': '/' } }));
  app.use(
    '/api',
    proxy({
      target: `${pxhost}`,
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' }
    })
  )
  app.use(
    '/extapi/hotels',
    proxy({
      target: `${pxhost2}`,
      changeOrigin: true,
      pathRewrite: { '^/extapi/hotels': '' }
    })
  )
  app.use(
    '/cssapi',
    proxy({
      target: 'https://qa.css.ual.com',
      changeOrigin: true,
      pathRewrite: { '^/cssapi': '' }
    })
  )

  if (isProd) {
    addProdMiddlewares(app, options)
  } else {
    const webpackConfig = require('../../internals/webpack/webpack.dev.babel')
    addDevMiddlewares(app, webpackConfig)
  }

  return app
}
