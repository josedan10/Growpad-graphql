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

/**
 *
 *
 * @param {*} parent
 * @param { username } args
 * @param {*} context
 * @param {*} info
 * @returns {[ Lists ]}
 */
const getUserLists = async (parent, { username }, context, info) => {
  try {
    let user = await UserModel.findOne({ username }, { lists: 1 })
    return user.lists
  } catch (error) {
    throw new ApolloError(`Error getting ${username}'s lists.`, '404')
  }
}

/**
 *
 *
 * @param {*} parent
 * @param { username, listId } args
 * @param {*} context
 * @param {*} info
 * @returns { List }
 */
const getUserListById = async (parent, { username, listId }, context, info) => {
  try {
    let user = await UserModel.findOne({ username }, { lists: 1 })
    return _.find(user.lists, { _id: mongoose.Types.ObjectId(listId) })
  } catch (error) {
    throw new ApolloError(`Error getting list.`, '404')
  }
}

/**
 *
 *
 * @param {*} parent
 * @param { username, listTitle } args
 * @param {*} context
 * @param {*} info
 * @returns {[ Lists ]}
 */
const getListsByTitle = async (parent, { username, listTitle }, context, info) => {
  try {
    let user = await UserModel.findOne({ username }, { lists: 1 })
    let regex = new RegExp(listTitle, 'gi')
    let lists = _.find(user.lists, (list) => regex.test(list.title))

    return (Array.isArray(lists)) ? lists : new Array(lists)
  } catch (error) {
    throw new ApolloError(`Error getting lists: ${error.message}`, '400')
  }
}

// const getListsBeforeDate = async (parent, args, context, info) => {

// }

/**
 *
 *
 * @param {*} parent
 * @param { tagName, username } args
 * @param {*} context
 * @param {*} info
 * @returns {[ Lists ]}
 */
const getListsByTag = async (parent, { tagName, username }, context, info) => {
  try {
    let user = UserModel.findOne({ username },
      {
        lists: 1
      }
    )

    let regex = new RegExp(tagName, 'gi')
    let lists = []
    _.find(user.lists, (list) => {
      list.tags.forEach((tag) => {
        if (regex.test(tag.name)) lists.push(list)
      })
    })

    return (Array.isArray(lists)) ? lists : new Array(lists)
  } catch (error) {
    throw new ApolloError(`Error getting lists by tagname '${tagName}': ${error.message}`, '400')
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
  getUserLists,
  getUserListById,
  getListsByTitle,
  getListsByTag,
  getUserTags
}
