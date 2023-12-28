// const { createServer } = require('node:http')
// const { parse } = require('node:url')
// const next = require('next')
//
// const dev = process.env.NODE_ENV !== 'production'
// const hostname = 'localhost'
// const port = 4002
// // when using middleware `hostname` and `port` must be provided below
// const app = next({ dev, hostname, port })
// const handle = app.getRequestHandler()
//
// app.prepare().then(() => {
//   createServer(async (req, res) => {
//     try {
//       // Be sure to pass `true` as the second argument to `url.parse`.
//       // This tells it to parse the query portion of the URL.
//       const parsedUrl = parse(req.url, true)
//       const { pathname, query } = parsedUrl
//
//       if (pathname === '/a')
//         await app.render(req, res, '/a', query)
//       else if (pathname === '/b')
//         await app.render(req, res, '/b', query)
//       else
//         await handle(req, res, parsedUrl)
//     }
//     catch (err) {
//       console.error('Error occurred handling', req.url, err)
//       res.statusCode = 500
//       res.end('internal server error')
//     }
//   })
//     .once('error', (err) => {
//       console.error(err)
//       process.exit(1)
//     })
//     .listen(port, () => {
//       console.log(`> Ready on http://${hostname}:${port}`)
//     })
// })

const express = require('express')
const next = require('next')
const config = require('./next.config')

const port = parseInt(process.env.PORT, 10) || 4002
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // 设置跨域支持
  server.all('*', (req, res) => {
    res.setHeader('access-control-allow-origin', '*')
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}${config.basePath}/`)
  })
})
