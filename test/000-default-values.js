/* globals describe it */

const { expect } = require('chai')
const path = require('path')
const gitLogToJson = require('../lib/git-log-to-json')

describe('get-log-to-json', () => {
  describe('when <dir> exists', () => {
    describe('when <dir> is a git repo', () => {
      it('should return the appropriate json', async () => {
        const res = await gitLogToJson(path.join(__dirname, './mock/repo'))
        expect(res).to.deep.equal(require('./mock/repo.json'))
      })
    })
  })

  describe('when <dir> does not exist', () => {
    it('stops and shows a message', async () => {
      try {
        await gitLogToJson(path.join(__dirname, './mock/unknown'))
        expect.fail()
      } catch (e) {
        expect(e).to.be.an.instanceOf(Error)
      }
    })
  })
})
