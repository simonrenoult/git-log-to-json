/**
 * Module dependencies
 */

const { execSync } = require('child_process')
const fs = require('fs')

/**
 * Exports
 */

module.exports = gitLogToJson

/**
 * Module logic
 */

const hash = '%H'
const authorName = '%an'
const authorEmail = '%ae'
const date = '%aI'
const subject = '%s'
const body = '%b'
const defaultFormat = { hash, date, subject, body, author: { name: authorName, email: authorEmail } }

async function gitLogToJson (dir, options) {
  if (fs.existsSync(dir) === false) {
    return new Error(`Directory ${dir} does not exist!`)
  }

  const format = _buildFormat(options)
  const commitLimit = options && options.limit ? `-n ${options.limit}` : ''
  const cmd = `git -C ${dir} log ${commitLimit} --pretty=format:'${JSON.stringify(format)},'`

  let stdout = execSync(cmd, { encoding: 'utf8' })
  stdout = stdout.replace(/\n/g, ' ')

  return JSON.parse(`[${stdout.slice(0, -1)}]`)
}

function _buildFormat (options) {
  if (!options) {
    return defaultFormat
  }

  const format = {}

  if (options.hash) format.hash = hash
  if (options.authorName || options.authorEmail) format.author = {}
  if (options.authorName) format.author.name = authorName
  if (options.authorEmail) format.author.email = authorEmail
  if (options.date) format.date = date
  if (options.subject) format.subject = subject
  if (options.body) format.body = body

  return Object.keys(format).length === 0 ? defaultFormat : format
}
