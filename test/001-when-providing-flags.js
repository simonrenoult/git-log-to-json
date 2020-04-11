/* globals describe it before beforeEach */

const chai = require('chai')
const path = require('path')
const repo = require('./mock/repo')
const gitLogToJson = require('../lib/git-log-to-json')

chai.should()

describe('get-log-to-json', () => {
  beforeEach((done) => {
    gitLogToJson(path.join(__dirname, './mock/repo'), this.option).then((res) => {
      this.actual = res
      done()
    })
  })

  describe('--pretty', () => {
    before(() => {
      this.option = {
        args: [
          'fakeCommandLineArg1',
          'fakeCommandLineArg2',
          'fakeCommandLineArg3',
          'fakeCommandLineArg4'
        ],
        pretty: true
      }
      this.expected = repo
    })
    it('should return the appropriate value', () => {
      this.actual.should.deep.equal(this.expected)
    })
  })

  describe('--limit', () => {
    before(() => {
      this.option = {
        args: [
          'fakeCommandLineArg1',
          'fakeCommandLineArg2',
          'fakeCommandLineArg3',
          'fakeCommandLineArg4'
        ],
        pretty: true,
        limit: 3
      }
      this.expected = repo
    })
    it('should return the appropriate limit of commits', () => {
      this.actual.length.should.equal(3)
    })
  })

  describe('--hash', () => {
    before(() => {
      this.option = {
        args: [
          'fakeCommandLineArg1',
          'fakeCommandLineArg2',
          'fakeCommandLineArg3',
          'fakeCommandLineArg4'
        ],
        hash: true
      }
      this.expected = repo.map((commit) => {
        return {
          hash: commit.hash
        }
      })
    })
    it('should return the appropriate value', () => {
      this.actual.should.deep.equal(this.expected)
    })
  })

  describe('--commit --date', () => {
    before(() => {
      this.option = {
        args: [
          'fakeCommandLineArg1',
          'fakeCommandLineArg2',
          'fakeCommandLineArg3',
          'fakeCommandLineArg4'
        ],
        hash: true,
        date: true
      }
      this.expected = repo.map((commit) => {
        return {
          hash: commit.hash,
          date: commit.date
        }
      })
    })
    it('should return the appropriate value', () => {
      this.actual.should.deep.equal(this.expected)
    })
  })

  describe('--commit --date --author-name', () => {
    before(() => {
      this.option = {
        args: [
          'fakeCommandLineArg1',
          'fakeCommandLineArg2',
          'fakeCommandLineArg3',
          'fakeCommandLineArg4'
        ],
        hash: true,
        date: true,
        authorName: true
      }
      this.expected = repo.map((commit) => {
        return {
          hash: commit.hash,
          date: commit.date,
          author: {
            name: commit.author.name
          }
        }
      })
    })
    it('should return the appropriate value', () => {
      this.actual.should.deep.equal(this.expected)
    })
  })

  describe('--commit --date --author-name --author-date', () => {
    before(() => {
      this.option = {
        args: [
          'fakeCommandLineArg1',
          'fakeCommandLineArg2',
          'fakeCommandLineArg3',
          'fakeCommandLineArg4'
        ],
        hash: true,
        date: true,
        authorName: true,
        authorEmail: true
      }
      this.expected = repo.map((commit) => {
        return {
          hash: commit.hash,
          date: commit.date,
          author: {
            name: commit.author.name,
            email: commit.author.email
          }
        }
      })
    })
    it('should return the appropriate value', () => {
      this.actual.should.deep.equal(this.expected)
    })
  })

  describe('--commit --date --author-name --author-date --subject', () => {
    before(() => {
      this.option = {
        args: [
          'fakeCommandLineArg1',
          'fakeCommandLineArg2',
          'fakeCommandLineArg3',
          'fakeCommandLineArg4'
        ],
        hash: true,
        date: true,
        authorName: true,
        authorEmail: true,
        subject: true
      }
      this.expected = repo.map((commit) => {
        return {
          hash: commit.hash,
          subject: commit.subject,
          date: commit.date,
          author: {
            name: commit.author.name,
            email: commit.author.email
          }
        }
      })
    })
    it('should return the appropriate value', () => {
      this.actual.should.deep.equal(this.expected)
    })
  })

  describe('--commit --date --author-name --author-date --subject --body', () => {
    before(() => {
      this.option = {
        args: [
          'fakeCommandLineArg1',
          'fakeCommandLineArg2',
          'fakeCommandLineArg3',
          'fakeCommandLineArg4'
        ],
        hash: true,
        date: true,
        authorName: true,
        authorEmail: true,
        subject: true,
        body: true
      }
      this.expected = repo.map((commit) => {
        return {
          hash: commit.hash,
          subject: commit.subject,
          date: commit.date,
          body: commit.body,
          author: {
            name: commit.author.name,
            email: commit.author.email
          }
        }
      })
    })
    it('should return the appropriate value', () => {
      this.actual.should.deep.equal(this.expected)
    })
  })
})
