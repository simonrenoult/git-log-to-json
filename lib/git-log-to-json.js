/**
 * Module dependencies
 */

const exec = require('child_process').exec
const fs = require('fs')
var Hjson = require('hjson')
/**
 * Exports
 */

module.exports = gitLogToJson

/**
 * Module logic
 */

// ++(escape_text)++
const hash = "\"%H\""
const authorName = "\"++(%an)++\""
const authorEmail = "\"%ae\""
// const date = "\"%aI\""
const date = "\"%ad\"" // look at `date-format`
const subject = "\"++(%s)++\""
const body = "\"++(%b)++\""

const defaultFormat = { hash, date, subject, body, author: { name: authorName, email: authorEmail } }

function gitLogToJson(dir, options) {
  if (fs.existsSync(dir) === false) {
    return Promise.reject(new Error(`Directory ${dir} does not exist!`))
  }

  const format = _buildFormat(options)
  const commitLimit = options && options.limit ? `-n ${options.limit}` : ''
  // const cmd = `git -C ${dir} log ${commitLimit} --pretty=format:'${JSON.stringify(format)},'`
  const cmd = `git -C ${dir} log ${commitLimit} --date=format:"%Y-%m-%d %H:%M:%S" --pretty=format:'${JSON.stringify(format)},'`

  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(err)
      if (stderr) return reject(stderr)
      stdout = stdout.replace(/\n/g, ' ')
      const dquotKey = function (str) {
        return str
          .replace(/hash:/g, "\"hash\":")
          .replace(/author:/g, "\"author\":")
          .replace(/name:/g, "\"name\":")
          .replace(/email:/g, "\"email\":")
          .replace(/date:/g, "\"date\":")
          .replace(/subject:/g, "\"subject\":")
          .replace(/body:/g, "\"body\":")
      }
      stdout = dquotKey(stdout)

      const escape = function (str) {
        return str
          .replace(/\'/g, "\\'")
          .replace(/\"/g, '\\"')
          .replace(/\//g, '\\/')
      }
      while (true) {
        var m = stdout.match(/\+\+\((.*?)\)\+\+/)
        if (m) {
          stdout = stdout.replace(m[0], escape(m[1]))
        } else {
          break
        }
      }
      var obj = Hjson.parse(`[${stdout.slice(1, -2)}]`)
      return resolve(obj)
    })
  })
}

function _buildFormat(options) {
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
