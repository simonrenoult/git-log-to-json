'use strict'

/**
 * Module dependencies
 */

const shell = require('shelljs')

/**
 * Exports
 */

module.exports = getLog

/**
 * Module logic
 */

const sha = '%h'
const author = '%an'
const date = '%ad'
const subject = '%s'
const sep = '%x09'

function getLog (dir) {
  if (!dir) throw new ReferenceError('`dir` must be provided')
  const format = `${sha}${sep}${author}${sep}${date}${sep}${subject}`
  const cmd = `git -C ${dir} log --pretty=format:"${format}" --date=short`
  let gitLog = shell.exec(cmd, {silent: true})
  if (parseInt(gitLog.code) !== 0) throw new Error(gitLog.stderr)
  return gitLog.output
}
