const AuthDirectives = require('./auth')
const GuestDirectives = require('./guest')
const TestDirectives = require('./test')

module.exports = {
  ...AuthDirectives,
  ...GuestDirectives,
  ...TestDirectives
}
