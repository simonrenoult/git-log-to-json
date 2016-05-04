'use strict'

/**
 * Module dependencies
 */

const child_process = require('child_process')

/**
 * Exports
 */

module.exports = gitLogToJson

/**
 * Module logic
 */

const hash = '%H'
const author_name = '%an'
const author_email = '%ae'
const date = '%aI'
const subject = '%s'
const body = '%b'
const default_format = {hash, date, subject, body, author: {name: author_name, email: author_email}}

function gitLogToJson (dir, options) {
  const format = _buildFormat(options)
  const cmd = `git -C ${dir} log --pretty=format:'${JSON.stringify(format)},'`
  return new Promise((resolve, reject) => {
    child_process.exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(err)
      if (stderr) return reject(stderr)
      return resolve(JSON.parse(`[${stdout.slice(0, -1)}]`))
    })
  })
}

function _buildFormat (options) {
  if (!options) return default_format
  let noFlag = options.args.length === 3
  let simplyPretty = options.args.length === 4 && options.pretty
  if (noFlag || simplyPretty) return default_format

  const format = {}
  if (options.hash) format.hash = hash
  if (options.authorName || options.authorEmail) format.author = {}
  if (options.authorName) format.author.name = author_name
  if (options.authorEmail) format.author.email = author_email
  if (options.date) format.date = date
  if (options.subject) format.subject = subject
  if (options.body) format.body = body
  return format
}
