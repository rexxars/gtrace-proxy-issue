const path = require('path')
const childProc = require('child_process')
const got = require('got')

let numReady = 0
const service1 = childProc.fork(path.join(__dirname, 'service1.js'))
const service2 = childProc.fork(path.join(__dirname, 'service2.js'))

service1.on('message', incReady)
service2.on('message', incReady)

function doRequest() {
  console.log('[master] requesting random number')
  got('http://localhost:4000/num', {json: true, retries: 0})
    .then(res => console.log('[master] response: %s', JSON.stringify(res.body)))
    .catch(err => console.error('[master] error: %s', err.stack))
    .then(shutdown)
}

function incReady() {
  if (++numReady === 2) {
    doRequest()
  }
}

function shutdown() {
  service1.send('shutdown')
  service2.send('shutdown')

  service1.disconnect()
  service2.disconnect()
}
