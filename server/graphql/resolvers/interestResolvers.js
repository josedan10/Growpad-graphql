const { ApolloError } = require('apollo-server-express')
const mongoose = require('mongoose')

// Models
const UserModel = require('../../models/User')

/**
 * This resolver is used to get all users that refers a interest
 *
 * @param {*} interest
 * @returns {[ Users ]}
 */
const interestUsers = async (interest, args, context, info) => {
  try {
    await interest.populate('users').execPopulate()
    return interest.users
    // return Promise.all(
    //   interest.users.map(({ id }) => UserModel.findById(mongoose.Types.ObjectId(id)))
    // )
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error getting users of ${interest.name}: ${error.message}`, '400')
  }
}

module.exports = {
  interestUsers
}
