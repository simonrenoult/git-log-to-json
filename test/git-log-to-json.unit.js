/* globals describe it before beforeEach */

'use strict'

const chai = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const expect = chai.expect

describe('git-log-to-json', () => {
  before(() => {
    this.cliStub = function () {}
    this.cliStub.help = function () {}
    this.getLogStub = function () { return 'fake git log' }
    this.parseLogStub = function () { return {fake: 'git log as json'} }

    this.cliHelpSpy = sinon.spy(this.cliStub, 'help')
    this.getLogSpy = sinon.spy(this, 'getLogStub')
    this.parseLogSpy = sinon.spy(this, 'parseLogStub')

    this.gitLogToJson = proxyquire('../lib/git-log-to-json', {
      './middlewares/cli': this.cliStub,
      './middlewares/getLog': this.getLogStub,
      './middlewares/parseLog': this.parseLogStub
    })
  })

  beforeEach(() => {
    this.cliHelpSpy.reset()
    this.getLogSpy.reset()
    this.parseLogSpy.reset()
    this.gitLogToJson()
  })

  describe('when "cli.args" are not provided', () => {
    before(() => {
      this.cliStub.args = undefined
    })
    it('should invoke cli.help', () => {
      expect(this.cliHelpSpy.calledOnce).to.be.true
    })
  })
  describe('when "cli.args" are an empty array', () => {
    before(() => {
      this.cliStub.args = []
    })
    it('should invoke "cli.help"', () => {
      expect(this.cliHelpSpy.calledOnce).to.be.true
    })
  })
  describe('when "cli.args" contain appropriate values', () => {
    before(() => {
      this.cliStub.args = ['fakeDir']
    })
    it('should invoke "gitLog" with the appropriate parameters', () => {
      expect(this.getLogSpy.callCount).to.equal(1)
      expect(this.getLogSpy.args[0][0]).to.equal('fakeDir')
    })
    describe('when "gitLog" returns a valid value', () => {
      it('should invoke "parseLog" with the appropriate parameters', () => {
        expect(this.parseLogSpy.callCount).to.equal(1)
        expect(this.parseLogSpy.args[0][0]).to.equal('fake git log')
      })
      describe('when "parseLog" returns an valid value', () => {
        it('should invoke "process.stdout.write" with the appropriate value', () => {
          this.processStdoutWriteStub = sinon.stub(process.stdout, 'write')
          this.gitLogToJson()
          expect(this.processStdoutWriteStub.args[0][0]).to.deep.equal(JSON.stringify({fake: 'git log as json'}))
          this.processStdoutWriteStub.restore()
        })
      })
    })
  })
})
