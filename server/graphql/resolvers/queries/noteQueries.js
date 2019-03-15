const mongoose = require('mongoose')
const moment = require('moment')
const { ApolloError } = require('apollo-server-express')

// Models
const NoteModel = require('../../../models/Note')
const TagModel = require('../../../models/Tag')

let uid = '5c8b23ac145b1136f4b6b244'

const getNotes = async (parent, args, context, info) => {
  try {
    // TODO: Pass the userId by the authentication
    return await NoteModel.find({})
  } catch (error) {
    throw new ApolloError(`Error getting notes.`, '404')
  }
}

/**
 *
 *
 * @param {*} parent
 * @param { id } args
 * @param {*} context
 * @param {*} info
 * @returns { Note }
 */
const getNoteById = async (parent, { id }, context, info) => {
  try {
    // TODO: Pass the userId by the authentication
    return await NoteModel.findById(mongoose.Types.ObjectId(id))
  } catch (error) {
    throw new ApolloError(`Error getting note.`, '404')
  }
}

/**
 *
 *
 * @param {*} parent
 * @param { username, noteTitle } args
 * @param {*} context
 * @param {*} info
 * @returns {[ Notes ]}
 */
const getNotesByTitle = async (parent, { title }, context, info) => {
  try {
    let userId = mongoose.Types.ObjectId(uid)
    return await NoteModel.find({ title: { $regex: title, $options: 'gi' }, createdBy: userId })
  } catch (error) {
    throw new ApolloError(`Error getting notes: ${error.message}`, '400')
  }
}

/**
 *
 *
 * @param {*} parent
 * @param { tagName, username } args
 * @param {*} context
 * @param {*} info
 * @returns {[ Notes ]}
 */
const getNotesByTag = async (parent, { tagName }, context, info) => {
  try {
    let userId = mongoose.Types.ObjectId(uid)
    let tag = TagModel.findOne({ name: tagName }, { _id: 1 })
    return await NoteModel.find({ tags: mongoose.Types.ObjectId(tag._id), createdBy: userId })
  } catch (error) {
    throw new ApolloError(`Error getting notes by tagname '${tagName}': ${error.message}`, '400')
  }
}

/**
 * @description: find the notes that update Date is between start and finish dates
 *
 * @param {*} parent
 * @param { start, finish } args
 * @param {*} context
 * @param {*} info
 * @returns
 */
const getNotesByDateInterval = async (parent, { start = moment(), finish = moment() }, context, info) => {
  try {
    return await NoteModel.find(
      {
        updatedAt: {
          $gte: moment(start).toISOString(),
          $lte: moment(finish).toISOString()
        }
      }
    )
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getNotes,
  getNoteById,
  getNotesByTitle,
  getNotesByTag,
  getNotesByDateInterval
}
