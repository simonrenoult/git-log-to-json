/* globals describe it */

'use strict'

const chai = require('chai')

const cli = require('../lib/middlewares/cli')
const pkg = require('../package')
const expect = chai.expect

describe('cli', () => {
  it('should be a module', () => {
    expect(cli).to.not.be.null
  })
  describe('version', () => {
    it('should match the package.json version', () => {
      expect(cli._version).to.equal(pkg.version)
    })
  })
  describe('description', () => {
    it('should match the package.json description', () => {
      expect(cli._description).to.equal(pkg.description)
    })
  })
  describe('alias', () => {
    it('should equal git log-to-json', () => {
      expect(cli._alias).to.equal('git log-to-json')
    })
  })
})
