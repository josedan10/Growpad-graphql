const { SchemaDirectiveVisitor } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')

const { checkLogin } = require('../../middlewares/auth')

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (...args) {
      const [ , , context ] = args
      checkLogin(context.req)
      return resolve.apply(this, args)
    }
  }
}

module.exports = AuthDirective
