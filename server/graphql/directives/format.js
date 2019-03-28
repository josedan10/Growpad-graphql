const { SchemaDirectiveVisitor } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')

/**
 * @description: format params to lowercase
 *
 * @class LowerCaseDirective
 * @extends {SchemaDirectiveVisitor}
 */

const lowerCaseArgs = ['tags', 'username']

const formatToLowerCase = (param) => {
  if (Array.isArray(param)) param = param.map(value => value.toLowerCase())
  else param = param.toLowerCase()

  return param
}

class LowerCaseDirective extends SchemaDirectiveVisitor {
  visitArgumentDefinition (arg) {
    arg.resolve = function (...args) {
      console.log(args)
    }
    // const { resolve = defaultFieldResolver } = field

    // field.resolve = function (...args) {
    //   const [ , params ] = args
    //   console.log(params)
    //   for (let i in params) {
    //     console.log(i)
    //     if (lowerCaseArgs.find(params[i])) params[i] = formatToLowerCase(params[i])
    //   }
    //   return resolve.apply(this, args)
    // }
  }

  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (...args) {
      const [ , params ] = args
      for (let i in params) {
        if (lowerCaseArgs.indexOf(i) >= 0) params[i] = formatToLowerCase(params[i])
      }
      return resolve.apply(this, args)
    }
  }
}

module.exports = {
  lowercase: LowerCaseDirective
  // lowercase: (next soruce) => {

  // }
}
