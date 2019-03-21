const { SchemaDirectiveVisitor } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')

class TestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    // console.log('Field', field)
    const { resolve = defaultFieldResolver } = field
    console.log('Resolve', resolve)
  }

  visitObject (value) {
    console.log('Object', value)
  }

  visitSchema (value) {
    console.log('Schema', value)
  }

  visitArgumentDefinition (argument) {
    console.log('Argmuent', argument)
  }

  // getDirectiveDeclaration (directiveName, schema) {
  //   console.log('Directive name: ' + directiveName)
  //   console.log('Schema: ' + schema)
  // }
}

module.exports = {
  test: TestDirective
}
