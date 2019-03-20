const AuthDirectives = require('./auth')
const GuestDirectives = require('./guest')

module.exports = {
  ...AuthDirectives,
  ...GuestDirectives
}
