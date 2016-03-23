'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const fs = require('fs')
const join = require('path').join
const packageFilename = join(process.cwd(), 'package.json')

function findVersion () {
  const envVersion = process.env.VERSION ||
  process.env.RELEASE ||
  process.env.COMMIT
  if (is.unemptyString(envVersion)) {
    return envVersion
  }

  if (fs.existsSync(packageFilename)) {
    const pkg = require(packageFilename)
    la(is.unemptyString(pkg.version), 'expected version in', packageFilename)
    return pkg.version
  }

  return 'undefined'
}

module.exports = findVersion
