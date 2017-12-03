/**
 * Module dependencies
 */

const program = require('commander')
const pkg = require('../package.json')

/**
 * Module logic
 */

program
  .version(pkg.version)
  .description(pkg.description)
  .usage('<dir>')
  .alias('git log-to-json')
  .option('-H, --hash', 'output the commit hash')
  .option('-D, --date', 'output the commit date')
  .option('-N, --author-name', 'output the commit author name')
  .option('-E, --author-email', 'output the commit author email')
  .option('-S, --subject', 'output the commit subject')
  .option('-B, --body', 'output the commit body')
  .option('-L, --limit [limit]', 'limit the number of commit logged')
  .option('-P, --pretty', 'format the output with "\\t"')
  .on('--help', () => {
    console.log()
    console.log('  Examples:')
    console.log()
    console.log('    $ git log-to-json .')
    console.log('    $ git log-to-json . --limit 3')
    console.log('    $ git log-to-json . --hash --date --author-name')
    console.log('    $ git log-to-json . -H -D --subject')
    console.log('    $ git log-to-json . -H -D -S -B --pretty')
    console.log('    $ ./bin/git-log-to-json .')
    console.log()
  })
  .parse(process.argv)

/**
 * Exports
 */

module.exports = program
