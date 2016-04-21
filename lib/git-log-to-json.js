'use strict'

/**
 * Module dependencies
 */

const cli = require('./middlewares/cli')
const getLog = require('./middlewares/getLog')
const parseLog = require('./middlewares/parseLog')

/**
 * Exports
 */

module.exports = gitLogToJson

/**
 * Module logic
 */

function gitLogToJson () {
  if (!cli.args.length) return cli.help()

  const log = getLog(cli.args[0])
  const json = parseLog(log)

  process.stdout.write(JSON.stringify(json))
}
