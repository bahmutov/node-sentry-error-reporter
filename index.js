const la = require('lazy-ass')
const is = require('check-more-types')
const raven = require('raven')

const sentryUrl = process.env.SENTRY_URL

function consoleErrorReporter (err, details) {
  console.error('The exception details')
  console.error(err.stack)
  if (details) {
    console.error('details', details)
  }
}

function isProduction () {
  return process.env.NODE_ENV === 'production'
}

var reporter
if (is.webUrl(sentryUrl) && isProduction()) {
  const client = new raven.Client(sentryUrl, {})
  reporter = client.captureException.bind(client)
} else {
  reporter = consoleErrorReporter
}

function installErrorHandlers (emitter) {
  process.on('uncaughtException', (err) => {
    console.error(`Caught global exception: ${err}`)
    reporter(err)
  })

  process.on('unhandledRejection', (reason) => {
    console.error(`Unhandled rejection: ${reason}`)
    reporter(new Error('Unhandled promise rejection'),
      {extra: {reason: reason}})
  })

  if (emitter) {
    la(is.has(emitter, 'on'), 'missing error emitter', emitter)
    emitter.on('error', (err) => {
      console.error(`Caught app exception: ${err}`)
      reporter(err)
    })
  }

  return function report (error) {
    la(is.error(error), 'expected error object', error)
    reporter(error)
  }
}

module.exports = installErrorHandlers
