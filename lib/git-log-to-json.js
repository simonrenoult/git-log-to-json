/**
 * Module dependencies
 */

const exec = require('child_process').exec
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
const defaultFormat = {hash, date, subject, body, author: {name: authorName, email: authorEmail}}

function gitLogToJson (dir, options) {
  if (fs.existsSync(dir) === false) {
    return Promise.reject(new Error(`Directory ${dir} does not exist!`))
  }

  const format = _buildFormat(options)
  const commitLimit = options && options.limit ? `-n ${options.limit}` : ''
  const cmd = `git -C ${dir} log ${commitLimit} --pretty=format:'${JSON.stringify(format)},'`

  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(err)
      if (stderr) return reject(stderr)
      stdout = stdout.replace(/\n/g, ' ')
      return resolve(JSON.parse(`[${stdout.slice(0, -1)}]`))
    })
  })
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
