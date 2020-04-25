/**
 * Module dependencies
 */

const { execSync } = require('child_process')
const { lstatSync } = require('fs')
const shortid = require('shortid')

/**
 * Exports
 */

module.exports = gitLogToJson

/**
 * Module logic
 */

const columnSeparator = shortid.generate()
const lineSeparator = shortid.generate()
const commitFormat = {
  hash: '%H',
  authorName: '%an',
  authorEmail: '%ae',
  date: '%aI',
  subject: '%s',
  body: '%b'
}
const DEFAULT_FORMAT = commitFormat

async function gitLogToJson (dir, options) {
  assertGitIsInstalled()
  assertIsDirectory(dir)

  const format = buildFormat(options)
  const cmd = buildCommand(dir, options, Object.values(format))
  const stdout = execSync(cmd, { encoding: 'utf8', maxBuffer: 2048 * 2048 })
  const json = toJson(stdout, format)

  return json
}

function toJson (stdout, format) {
  return stdout.split(lineSeparator)
    .slice(1)
    .map(line => {
      const chunks = line.split(columnSeparator)

      const obj = {}
      const keys = Object.keys(format)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const value = chunks[i]

        if (key === 'authorEmail') {
          if (!obj.author) obj.author = {}
          obj.author.email = value
        } else if (key === 'authorName') {
          if (!obj.author) obj.author = {}
          obj.author.name = value
        } else {
          obj[key] = value
        }
      }

      if (obj.body === '\n') obj.body = ''

      return obj
    })
    .map(commit => {
      if (commit.subject) {
        commit.subject = commit.subject.replace('\\n', '\n')
      }
      return commit
    })
}

function buildCommand (dir, options, format) {
  const commitLimit = options && options.limit ? `--max-count ${options.limit}` : ''
  const cmd = `git -C ${dir} log ${commitLimit} --pretty=format:${lineSeparator}${format.join(columnSeparator)}`

  return cmd
}

function buildFormat (options) {
  if (!options) return DEFAULT_FORMAT

  const format = {
    hash: !!options.hash,
    authorName: !!options.authorName,
    authorEmail: !!options.authorEmail,
    date: !!options.date,
    subject: !!options.subject,
    body: !!options.body
  }

  const arr = {}
  for (const key in format) {
    if (format[key] === true) {
      arr[key] = commitFormat[key]
    }
  }

  return arr.length
    ? arr
    : DEFAULT_FORMAT
}

function assertGitIsInstalled () {
  try {
    execSync('which git')
  } catch (error) {
    throw new Error('Program "git" must be installed')
  }
}

function assertIsDirectory (directory) {
  if (!lstatSync(directory).isDirectory()) {
    throw new Error('Argument "dir" must be a directory.')
  }
}
