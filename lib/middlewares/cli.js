'use strict'

/**
 * Module dependencies
 */

const program = require('commander')
const pkg = require('../../package.json')

/**
 * Module logic
 */

program
  .version(pkg.version)
  .description(pkg.description)
  .usage('<dir>')
  .alias('git log-to-json')
  .on('--help', () => {
    console.log('  Examples:')
    console.log()
    console.log('    $ git log-to-json .')
    console.log('    $ ./bin/git-log-to-json .')
    console.log()
  })
  .parse(process.argv)

/**
 * Exports
 */

module.exports = program
