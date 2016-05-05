'use strict'

/**
 * Module dependencies
 */

const exec = require('child_process').exec

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
  const format = _buildFormat(options)
  const cmd = `git -C ${dir} log --pretty=format:'${JSON.stringify(format)},'`
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
  if (!options) return defaultFormat
  let noFlag = options.args.length === 3
  let simplyPretty = options.args.length === 4 && options.pretty
  if (noFlag || simplyPretty) return defaultFormat

  const format = {}
  if (options.hash) format.hash = hash
  if (options.authorName || options.authorEmail) format.author = {}
  if (options.authorName) format.author.name = authorName
  if (options.authorEmail) format.author.email = authorEmail
  if (options.date) format.date = date
  if (options.subject) format.subject = subject
  if (options.body) format.body = body
  return format
}
