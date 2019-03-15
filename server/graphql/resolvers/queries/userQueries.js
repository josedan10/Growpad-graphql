const mongoose = require('mongoose')
const moment = require('moment')
const { UserInputError, ApolloError } = require('apollo-server-express')
const _ = require('lodash')

// Models
const UserModel = require('../../../models/User')
const TagModel = require('../../../models/Tag')

/**
 *
 *
 * @param {*} parent
 * @param {*} args
 * @param {*} context
 * @param {*} info
 * @returns {[ Users ]}
 */
const getUsers = async (parent, args, context, info) => UserModel.find({})

/**
 *
 * @param {*} parent
 * @param { id } args
 * @param {*} context
 * @param {*} info
 * @returns { User }
 */
const getUserById = async (parent, { id }, context, info) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new UserInputError(`${id} is not valid user ID`)
  }

  try {
    return UserModel.findById(id)
  } catch (error) {
    throw new ApolloError(`Error finding user with ID '${id}': ${error.message}`, '400')
  }
}

/**
 *
 *
 * @param {*} parent
 * @param { username } args
 * @param {*} context
 * @param {*} info
 * @returns { User }
 */
const getUserByUsername = async (parent, { username }, context, info) => {
  try {
    return UserModel.findOne({ username })
  } catch (error) {
    throw new ApolloError(`Error finding user ${username}`, '404')
  }
}

const getUserTags = async (parent, { userId }, context, info) => {
  try {
    return TagModel.find({ users: userId }, { name: 1 })
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error getting tags of user: ${error.message}`)
  }
}

module.exports = {
  getUsers,
  getUserById,
  getUserByUsername,
  getUserTags
}
