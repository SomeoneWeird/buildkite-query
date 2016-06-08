var request = require('superagent')

module.exports = function (accessToken) {
  return function runQuery (query, callback) {
    request
      .post('https://graphql.buildkite.com/v1')
      .send({ query: query })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + accessToken)
      .end(function (err, response) {
        if (err) {
          return callback(err)
        }
        if (response.body.errors) {
          return callback(response.body.errors)
        }
        return callback(null, response.body)
      })
  }
}
