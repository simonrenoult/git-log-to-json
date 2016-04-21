/* globals describe it before after */

'use strict'

const chai = require('chai')
const sinon = require('sinon')
const shell = require('shelljs')

const getLog = require('../lib/middlewares/getLog')
const expect = chai.expect

chai.should()

describe('getLog', () => {
  describe('when "dir" is not provided', () => {
    it('should throw an error', () => {
      (() => getLog()).should.throw(ReferenceError)
    })
  })
  describe('when "dir" does not exist', () => {
    before(() => {
      this.execStub = sinon.stub(shell, 'exec')
      this.execStub.returns({code: 1, stderr: 'foobar'})
    })
    after(() => {
      shell.exec.restore()
    })
    it('should throw an error', () => {
      expect(() => getLog('bar')).to.throw(Error)
    })
  })
  describe('when "dir" exists', () => {
    before(() => {
      this.execStub = sinon.stub(shell, 'exec')
      this.execStub.returns({code: 0, output: 'lorem ipsum'})
      this.res = getLog('foo')
    })
    after(() => {
      shell.exec.restore()
    })
    it('should invoke git log with the appropriate params', () => {
      this.execStub.args[0][0].should.equal('git -C foo log --pretty=format:"%h%x09%an%x09%ad%x09%s" --date=short')
    })
    it('should return the appropriate value', () => {
      this.res.should.equal('lorem ipsum')
    })
  })
})
