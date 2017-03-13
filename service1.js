if (typeof process.env.SKIP_TRACE === 'undefined') {
  require('@google-cloud/trace-agent').start()
}

const Hapi = require('hapi')
const h2o2 = require('h2o2')
const server = new Hapi.Server()

server.register({
  register: h2o2
})

server.connection({port: 4000, host: 'localhost'})

server.route({
  method: 'GET',
  path: '/num',
  handler: {
    proxy: {
      host: 'localhost',
      port: '4001',
      protocol: 'http'
    }
  }
})

server.start(err => {
  if (err) {
    throw err
  }

  console.log('[service 1] listening on port 4000')
  process.send('ready')
})

process.on('message', () => {
  console.log('[service 1] shutting down')
  server.stop()
})
