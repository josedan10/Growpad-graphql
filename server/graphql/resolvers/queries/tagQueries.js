const TagModel = require('../../../models/Tag')
const { ApolloError } = require('apollo-server-express')

const getTags = async (parent, args, context, info) => {
  try {
    return TagModel.find({})
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error getting the tags: ${error.message}`, '400')
  }
}

module.exports = {
  getTags
}
