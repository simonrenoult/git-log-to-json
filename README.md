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

## Usage

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
  -P, --pretty        format the output with "\t"

Examples:

  $ git log-to-json .
  $ git log-to-json . --hash --date --author-name
  $ git log-to-json . -H -D --subject
  $ git log-to-json . -H -D -S -B --pretty
  $ ./bin/git-log-to-json .
```

## Examples

```
$ git log-to-json . > history.json
```

```
$ git log-to-json . --hash --date --author-name --pretty > history.json
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
