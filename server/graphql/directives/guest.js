const { SchemaDirectiveVisitor } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')

const { checkLogout } = require('../../middlewares/auth')

class GuestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (...args) {
      const [ , , context ] = args
      checkLogout(context.req)
      return resolve.apply(this, args)
    }
  }
}

module.exports = {
  guest: GuestDirective
}
