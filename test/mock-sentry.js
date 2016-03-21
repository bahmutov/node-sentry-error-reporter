'use strict'

const nock = require('nock')
const zlib = require('zlib')
const la = require('lazy-ass')
const is = require('check-more-types')

nock('http://localhost')
  .post('/api/11/store/')
  .reply(200, function (uri, body) {
    console.log('received mock sentry request', uri)
    const buffer = new Buffer(body, 'base64')
    zlib.unzip(buffer, {}, function (err, msg) {
      const errorMessage = JSON.parse(msg.toString('utf8'))
      console.log('received error message', errorMessage.message)
      la(/this is a test/.test(errorMessage.message),
        'wrong error message', errorMessage)
      la(errorMessage.release === '0.0.0-semantic-release',
        'invalid release, should be package version', errorMessage.release)
    })
  })
