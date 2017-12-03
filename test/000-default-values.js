/* globals describe it */

const chai = require('chai')
const path = require('path')
const gitLogToJson = require('../lib/git-log-to-json')

chai.should()

describe('get-log-to-json', () => {
  describe('when <dir> exists', () => {
    describe('when <dir> is a git repo', () => {
      it('should return the appropriate json', () => {
        gitLogToJson(path.join(__dirname, './mock/repo')).then((res) => {
          res.should.deep.equal(require('./mock/repo.json'))
        })
      })
    })
  })

  describe('when <dir> does not exist', () => {
    it('stops and shows a message', () => {
      gitLogToJson(path.join(__dirname, './mock/unknown')).catch((err) => {
        err.should.exists
      })
    })
  })
})
