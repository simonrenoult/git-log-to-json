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

const defaultAtoB = ""
const defaultFormat = { hash, date, subject, body, author: { name: authorName, email: authorEmail } }

function gitLogToJson(dir, options) {
  if (fs.existsSync(dir) === false) {
    return Promise.reject(new Error(`Directory ${dir} does not exist!`))
  }

  const AtoB = _buildAtoB(options)
  const format = _buildFormat(options)
  const commitLimit = options && options.limit ? `-n ${options.limit}` : ''
  const cmd = `git -C ${dir} log ${AtoB} ${commitLimit} --date=format:"%Y-%m-%d %H:%M:%S" --pretty=format:'${JSON.stringify(format)},'`
  // console.log(cmd);
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(err)
      if (stderr) return reject(stderr)

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
          .replace(/\"/g, '\\"')
          .replace(/\//g, '\\/')
      }
      while (true) {
        let m = stdout.match(/\+\+\((.*?)\)\+\+/)
        if (m) {
          stdout = stdout.replace(m[0], escape(m[1]))
        } else {
          break
        }
      }
      stdout = stdout.replace(/\'\n\'/g, '')
      let obj = Hjson.parse(`[${stdout.slice(1, -2)}]`)
      return resolve(obj)
    })
  })
}

function _buildAtoB(options) {
  if (!options) {
    return defaultAtoB
  }
  if (!options.startCommitId) {
    options.startCommitId = "HEAD^" // 一つ前
  }
  if (!options.endCommitId) {
    options.endCommitId = "HEAD"
  }
  // start_commitIdの後から、endCommitId(を含む)までの範囲を取得
  let AtoB = `${options.startCommitId}..${options.endCommitId}` // ..カレントブランチからコミットIDを検索
  if (options.startCommitId === options.endCommitId || options.startCommitId === "HEAD^") {
    // コミットIDが同じ場合
    AtoB = options.endCommitId;
  }
  return AtoB
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
