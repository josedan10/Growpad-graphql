const mongoose = require('mongoose')
const moment = require('moment')
const { ApolloError } = require('apollo-server-express')

// Models
const ListModel = require('../../../models/List')
const TagModel = require('../../../models/Tag')

let uid = '5c8b23ac145b1136f4b6b244'

const getLists = async (parent, { listId }, context, info) => {
  try {
    // TODO: Pass the userId by the authentication
    return await ListModel.find({})
  } catch (error) {
    throw new ApolloError(`Error getting lists.`, '404')
  }
}

/**
 *
 *
 * @param {*} parent
 * @param { listId } args
 * @param {*} context
 * @param {*} info
 * @returns { List }
 */
const getListById = async (parent, { id }, context, info) => {
  try {
    // TODO: Pass the userId by the authentication
    return await ListModel.findById(mongoose.Types.ObjectId(id))
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
const getListsByTitle = async (parent, { title }, context, info) => {
  try {
    let userId = mongoose.Types.ObjectId(uid)
    return await ListModel.find({ title: { $regex: title, $options: 'gi' }, createdBy: userId })
  } catch (error) {
    throw new ApolloError(`Error getting lists: ${error.message}`, '400')
  }
}

/**
 *
 *
 * @param {*} parent
 * @param { tagName, username } args
 * @param {*} context
 * @param {*} info
 * @returns {[ Lists ]}
 */
const getListsByTag = async (parent, { tagName }, context, info) => {
  try {
    let userId = mongoose.Types.ObjectId(uid)
    let tag = TagModel.findOne({ name: tagName }, { _id: 1 })
    return await ListModel.find({ tags: mongoose.Types.ObjectId(tag._id), createdBy: userId })
  } catch (error) {
    throw new ApolloError(`Error getting lists by tagname '${tagName}': ${error.message}`, '400')
  }
}

/**
 * @description: find the lists that update Date is between start and finish dates
 *
 * @param {*} parent
 * @param { start, finish } args
 * @param {*} context
 * @param {*} info
 * @returns
 */
const getListsByDateInterval = async (parent, { start, finish }, context, info) => {
  try {
    return await ListModel.find(
      {
        updatedAt: {
          $gte: moment(start),
          $lte: moment(finish)
        }
      }
    )
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getLists,
  getListById,
  getListsByTitle,
  getListsByTag,
  getListsByDateInterval
}
