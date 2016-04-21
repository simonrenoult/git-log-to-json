'use strict'

/**
 * Module dependencies
 */

const EOL = '\n'
const SEP = '\t'

/**
 * Exports
 */

module.exports = parseLog

/**
 * Module logic
 */

function parseLog (log) {
  if (!log) return []
  return log.split(EOL).map((commit) => {
    let chunks = commit.split(SEP)
    let sha = chunks[0]
    let author = chunks[1]
    let date = chunks[2]
    let subject = chunks[3]
    return {sha, date, author, subject}
  })
}
