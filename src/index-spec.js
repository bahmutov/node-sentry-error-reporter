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

  it('returns same function every time', () => {
    const f1 = init()
    const f2 = init()
    la(f1 === f2)
  })

  it('returns same with diff parameters', () => {
    // it should only add emitter "error" handler
    const f1 = init()
    const f2 = init({on: function () {}})
    la(f1 === f2)
  })
})
