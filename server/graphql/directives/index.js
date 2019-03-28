const AuthDirectives = require('./auth')
const GuestDirectives = require('./guest')
const TestDirectives = require('./test')
const FormatDirectives = require('./format')

module.exports = {
  ...AuthDirectives,
  ...GuestDirectives,
  ...TestDirectives,
  // lowercase: (next, source, args, context, info) => {
  //   console.log(args)
  // }
  ...FormatDirectives
}
