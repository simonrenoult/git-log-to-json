# git-log-to-json

[![Style Status][style-image]][style-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coverage-image]][coverage-url]
[![NPM Version][npm-image]][npm-url]

> Print a configurable git log in json

## Install

```
$ npm install git-log-to-json
```

## CLI

```
Usage: git-log-to-json|git log-to-json <dir>

Print a configurable git log in json

Options:

  -h, --help          output usage information
  -V, --version       output the version number
  -H, --hash          output the commit hash
  -D, --date          output the commit date
  -N, --author-name   output the commit author name
  -E, --author-email  output the commit author email
  -S, --subject       output the commit subject
  -B, --body          output the commit body
  -L, --limit         limit the number of commit logged
  -P, --pretty        format the output with "\t"

Examples:

  $ git log-to-json .
  $ git log-to-json . --limit 3
  $ git log-to-json . --hash --date --author-name
  $ git log-to-json . -H -D --subject
  $ git log-to-json . -H -D -S -B --pretty
  $ ./bin/git-log-to-json . > history.json
```

## API

`require('git-log-to-json')(directory[, options])`
 * `directory` _&lt;String&gt;_ The directory to analyze. Must contain a `.git` directory
 * `options` _&lt;Object&gt;_ An optional map of flags to configure the `git log` command:
   * `hash` _&lt;Boolean&gt;_ Includes the commit hash
   * `date` _&lt;Boolean&gt;_ Includes the commit date
   * `subject` _&lt;Boolean&gt;_ Includes the commit subject
   * `body` _&lt;Boolean&gt;_ Includes the commit body
   * `authorEmail` _&lt;Boolean&gt;_ Includes the commit author email
   * `authorName` _&lt;Boolean&gt;_ Includes the commit author name
   * `limit` _&lt;Integer&gt;_ Limit the number of commit logged
   * `pretty` _&lt;Boolean&gt;_ Format the output with \t
 * Return: _&lt;Promise&gt;_ The promise resolved once the `git log` command is executed.

## Examples

Given the commit:
```
feat(#420): node.js rocks

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
```

```js
require('git-log-to-json')('.')
  .then((log) => {
    /* log will contain:
    [{
      "hash": "<hash>",
      "date": "2016-04-21T19:00:13+02:00",
      "subject": "feat(#420): node.js rocks",
      "body": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      "author": {
        "name": "Simon Renoult",
        "email": "simon.renoult@gmail.com"
      }
    }]
     */
  })
  .catch((err) => {
    // do something
  })

require('git-log-to-json')('.', {hash: true, date: true, authorEmail: true})
  .then((log) => {
    /* log will contain:
    [{
      "hash": "<hash>",
      "date": "2016-04-21T19:00:13+02:00",
      "author": {
        "email": "simon.renoult@gmail.com"
      }
    }]
     */
  })
  .catch((err) => {
    // do something
  })
```

## Troubleshooting

> The tests fail to run locally.

The `test/mock/repo` submodule might be missing. Clone `git-log-to-json` with the `--recursive` flag.

> I installed `git-log-to-json` globally but the command is not found.

The command is still available, not to autocompletion though. This is due to
`git` doing some fancy work. The autocompletion will work with `git log-to-json`.

[travis-image]: https://travis-ci.org/simonrenoult/git-log-to-json.svg?branch=master
[travis-url]: https://travis-ci.org/simonrenoult/git-log-to-json
[style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[style-url]: http://standardjs.com/
[coverage-image]: https://coveralls.io/repos/github/simonrenoult/git-log-to-json/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/simonrenoult/git-log-to-json?branch=master
[npm-image]: https://img.shields.io/npm/v/git-log-to-json.svg?style=flat-squared
[npm-url]: https://www.npmjs.com/package/git-log-to-json
