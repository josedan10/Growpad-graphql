const mongoose = require('mongoose')
const moment = require('moment')
const { UserInputError, ApolloError } = require('apollo-server-express')
const _ = require('lodash')

const AuthMiddleware = require('../../../middlewares/auth')

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
const getUsers = async (parent, args, { req }, info) => {
  AuthMiddleware.checkLogin(req)

  try {
    return UserModel.find({})
  } catch (error) {
    throw new ApolloError(`Error getting users: ${error.message}.`)
  }
}

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

const profile = async (parent, args, { req }, info) => {
  let userId = mongoose.Types.ObjectId(AuthMiddleware.checkLogin(req))
  try {
    return UserModel.findById(userId)
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error finding the user: ${error.message}`)
  }
}

module.exports = {
  profile,
  getUsers,
  getUserById,
  getUserByUsername
}
