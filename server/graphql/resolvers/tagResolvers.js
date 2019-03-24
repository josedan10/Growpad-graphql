const { ApolloError } = require('apollo-server-express')
const mongoose = require('mongoose')

// Models
const UserModel = require('../../models/User')

/**
 * This resolver is used to get all users that refers a tag
 *
 * @param {*} users
 * @returns {[ Users ]}
 */
const tagUsers = async (tag, args, context, info) => {
  try {
    await tag.populate('users').execPopulate()
    return tag.users
    // return Promise.all(
    //   tag.users.map(({ id }) => UserModel.findById(mongoose.Types.ObjectId(id)))
    // )
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error getting users of ${tag.name}: ${error.message}`, '400')
  }
}

module.exports = {
  tagUsers
}
