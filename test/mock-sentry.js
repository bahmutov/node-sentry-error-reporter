'use strict'

const nock = require('nock')
const zlib = require('zlib')
nock('http://localhost')
  .post('/api/11/store/')
  .reply(200, function (uri, body) {
    console.log('received mock sentry request', uri)
    const buffer = new Buffer(body, 'base64')
    zlib.unzip(buffer, {}, function (err, msg) {
      const errorMessage = JSON.parse(msg.toString('utf8'))
      console.log(errorMessage.message)
      console.assert(/this is a test/.test(errorMessage.message), 'expected error')
    })
  })
