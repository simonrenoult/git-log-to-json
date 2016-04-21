'use strict'

/**
 * Module dependencies
 */

const program = require('commander')
const pkg = require('../../package.json')

/**
 * Exports
 */

module.exports = program

/**
 * Module logic
 */

program
  .version(pkg.version)
  .description(pkg.description)
  .usage('<dir>')
  .parse(process.argv)
