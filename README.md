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

## Note

If installed globally, the command `git-log-to-json` will not be available. Use `git log-to-json` instead. This is due to `git` doing some fancy work.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016 Simon Renoult

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[travis-image]: https://travis-ci.org/simonrenoult/git-log-to-json.svg?branch=master
[travis-url]: https://travis-ci.org/simonrenoult/git-log-to-json
[style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[style-url]: http://standardjs.com/
[coverage-image]: https://coveralls.io/repos/github/simonrenoult/git-log-to-json/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/simonrenoult/git-log-to-json?branch=master
[npm-image]: https://img.shields.io/npm/v/git-log-to-json.svg?style=flat-squared
[npm-url]: https://www.npmjs.com/package/git-log-to-json
