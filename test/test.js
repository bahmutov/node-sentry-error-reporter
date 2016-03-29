'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const reporter = require('node-sentry-error-reporter')
la(is.fn(reporter), 'expected install reporter fn', reporter)
const report = reporter()
la(is.fn(report), 'expected to get report function', report)

report(new Error('this is a test error'))

report(new Error('this is a test 2 error'))
