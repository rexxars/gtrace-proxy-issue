if (typeof process.env.SKIP_TRACE === 'undefined') {
  require('@google-cloud/trace-agent').start()
}

const express = require('express')
const app = express()

let server = null

app.get('/num', (req, res) => {
  console.log('[service 2] delivering random number')
  res.json({number: Math.random(), from: 'service 2'})
})

server = app.listen(4001, () => {
  console.log('[service 2] listening on port 4001')
  process.send('ready')
})

process.on('message', () => {
  console.log('[service 2] shutting down')
  server.close()
})