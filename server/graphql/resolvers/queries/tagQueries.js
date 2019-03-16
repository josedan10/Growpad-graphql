const TagModel = require('../../../models/Tag')
const { ApolloError } = require('apollo-server-express')

const AuthMiddleware = require('../../../middlewares/auth')

const getTags = async (parent, args, context, info) => {
  try {
    return TagModel.find({})
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error getting the tags: ${error.message}`, '400')
  }
}

const getUserTags = async (parent, args, { req }, info) => {
  try {
    let userId = AuthMiddleware.checkLogin(req)
    return TagModel.find({ users: userId }, { name: 1 })
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error getting tags of user: ${error.message}`)
  }
}

module.exports = {
  getTags,
  getUserTags
}
