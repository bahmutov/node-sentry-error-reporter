'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const Raven = require('raven')
const memoize = require('lodash.memoize')
const alwaysError = require('always-error')
const version = require('./src/find-version')()

const sentryUrl = process.env.SENTRY_URL ||
  process.env.SENTRY_DSN || process.env.SENTRY

function consoleErrorReporter (err, details) {
  console.error('Error', err)
  if (err.stack) {
    console.error(err.stack)
  }
  if (details) {
    console.error('The exception details')
    console.error('details', details)
  }
}

function isProduction () {
  return process.env.NODE_ENV === 'production'
}

function useRavenReporter () {
  return is.webUrl(sentryUrl) && isProduction()
}

var reporter
if (useRavenReporter()) {
  console.log('using Sentry reporter with release', version)
  Raven.config(sentryUrl, {
    release: version
  }).install()

  reporter = function sendErrorToSentry (err, details) {
    Raven.captureException(err, {extra: details})
  }
} else {
  reporter = consoleErrorReporter
}

const installReportExceptions = memoize(function () {
  process.on('uncaughtException', (err) => {
    console.error('Caught global exception:', err)
    reporter(err)
  })
})

const installReportRejections = memoize(function () {
  process.on('unhandledRejection', (reason) => {
    console.error(`Unhandled rejection: ${reason}`)
    reporter(new Error('Unhandled promise rejection'),
      {extra: {reason: reason}})
  })
})

function userReporter (x, details) {
  const error = alwaysError(x)
  la(is.error(error), 'expected error object', error)
  console.log(`Reporting an error "${error.message}"`)
  reporter(error, details)
}

function installErrorHandlers (emitter) {
  installReportExceptions()
  installReportRejections()

  if (emitter) {
    la(is.has(emitter, 'on'), 'missing error emitter', emitter)
    emitter.on('error', (err) => {
      console.error(`Caught app exception: ${err}`)
      reporter(err)
    })
  }

  return userReporter
}

module.exports = memoize(installErrorHandlers)
