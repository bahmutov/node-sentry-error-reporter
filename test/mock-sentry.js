'use strict'

const nock = require('nock')
const zlib = require('zlib')
const la = require('lazy-ass')
const is = require('check-more-types')

// first error
nock('http://localhost')
  .post('/api/11/store/')
  .reply(200, function (uri, body) {
    console.log('received mock sentry request', uri)
    const buffer = new Buffer(body, 'base64')
    zlib.unzip(buffer, function (err, msg) {
      const errorMessage = JSON.parse(msg.toString('utf8'))
      console.log('received error message', errorMessage.message)
      console.log('release / version', errorMessage.release)

      la(/this is a test/.test(errorMessage.message),
        'wrong error message', errorMessage)
      la(errorMessage.release === '0.0.0-semantic-release',
        'invalid release, should be package version', errorMessage.release)
    })
  })

// second error
nock('http://localhost')
  .post('/api/11/store/')
  .reply(200, function (uri, body) {
    console.log('received 2nd mock sentry request', uri)
    const buffer = new Buffer(body, 'base64')
    zlib.unzip(buffer, function (err, msg) {
      const errorMessage = JSON.parse(msg.toString('utf8'))
      console.log('received error message 2', errorMessage.message)
      console.log('release / version 2', errorMessage.release)

      la(/this is a test 2/.test(errorMessage.message),
        'wrong error message', errorMessage)
      la(errorMessage.release === '0.0.0-semantic-release',
        'invalid release, should be package version', errorMessage.release)
    })
  })
