const { SchemaDirectiveVisitor } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')

const { isAuthenticated, checkAdminUser } = require('../../middlewares/auth')

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (...args) {
      const [ , , context ] = args
      let uid = isAuthenticated(context.req)
      // Pass the user id in the context
      args[2].uid = uid
      return resolve.apply(this, args)
    }
  }
}

class AdminDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (...args) {
      const [ , , context ] = args
      checkAdminUser(context.req)
      return resolve.apply(this, args)
    }
  }
}

module.exports = {
  auth: AuthDirective,
  admin: AdminDirective
}
