const commits = exports.commits = [
  {
    raw: '2c60a53	Simon Renoult	2016-03-31	doc: foo bar baz',
    obj: {
      sha: '2c60a53',
      author: 'Simon Renoult',
      date: '2016-03-31',
      subject: 'doc: foo bar baz'
    }
  },
  {
    raw: '2c60a53	Simon Renoult	2016-03-31	chore: foo bar baz',
    obj: {
      sha: '2c60a53',
      author: 'Simon Renoult',
      date: '2016-03-31',
      subject: 'chore: foo bar baz'
    }
  },
  {
    raw: '2c60a53	Simon Renoult	2016-03-31	fix: foo bar baz',
    obj: {
      sha: '2c60a53',
      author: 'Simon Renoult',
      date: '2016-03-31',
      subject: 'fix: foo bar baz'
    }
  },
  {
    raw: '2c60a53	Simon Renoult	2016-03-31	feat: foo bar baz',
    obj: {
      sha: '2c60a53',
      author: 'Simon Renoult',
      date: '2016-03-31',
      subject: 'feat: foo bar baz'
    }
  },
  {
    raw: 'e4a64e5	Simon Renoult	2016-03-31	base commit title',
    obj: {
      author: 'Simon Renoult',
      sha: 'e4a64e5',
      date: '2016-03-31',
      subject: 'base commit title'
    }
  },
  {
    raw: 'fd93lde	Simon Renoult	2016-02-28	0.1.0',
    obj: {
      author: 'Simon Renoult',
      sha: 'fd93lde',
      date: '2016-02-28',
      subject: '0.1.0'
    }
  }
]

exports.history = {
  obj: [
    commits[0].obj,
    commits[0].obj,
    commits[0].obj,
    commits[0].obj
  ],
  raw:
`${commits[0].raw}
${commits[0].raw}
${commits[0].raw}
${commits[0].raw}`
}
