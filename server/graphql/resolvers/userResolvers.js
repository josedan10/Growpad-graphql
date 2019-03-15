const mongoose = require('mongoose')
const { ApolloError } = require('apollo-server-express')

// Models
const InterestModel = require('../../models/Interest')
const ListModel = require('../../models/List')
const UserModel = require('../../models/User')

const userInterests = (user) => {
  try {
    return Promise.all(
      user.interests.map(({ id }) => InterestModel.findById(mongoose.Types.ObjectId(id)))
    )
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error getting users of ${user.username}: ${error.message}`, '400')
  }
}

const userLists = (user) => {
  try {
    return Promise.all(
      user.lists.map(({ id }) => ListModel.findById(mongoose.Types.ObjectId(id)))
    )
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error getting users of ${user.username}: ${error.message}`, '400')
  }
}

const createdBy = async (object) => {
  try {
    return await UserModel.findById(mongoose.Types.ObjectId(object.createdBy))
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error getting user: ${error.message}`)
  }
}

module.exports = {
  userInterests,
  userLists,
  createdBy
}
