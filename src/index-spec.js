const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('reporter', () => {
  const init = require('..')
  it('init is a function', () => {
    la(is.fn(init))
  })

  it('returns a function', () => {
    const report = init()
    la(is.fn(report))
  })
})
