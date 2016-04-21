/* globals describe it before */

'use strict'

const chai = require('chai')

const parseLog = require('../lib/middlewares/parseLog')
const commits = require('./mock/commits')

chai.should()

describe('parseLog', () => {
  describe('when log is not provided', () => {
    before(() => {
      this.res = parseLog()
    })
    it('should return an array', () => {
      this.res.should.be.an('array')
    })
    it('should be empty', () => {
      this.res.length.should.equal(0)
    })
  })
  describe('when log is provided', () => {
    before(() => {
      this.res = parseLog(commits.history.raw)
    })
    it('should contain the appropriate values', () => {
      this.res.should.deep.equal(commits.history.obj)
    })
  })
})
