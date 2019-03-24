const mongoose = require('mongoose')
const { ApolloError } = require('apollo-server-express')

// Models
const TagModel = require('../../models/Tag')

/**
 * @description: search the note's tags.
 *
 * @param {*} note
 * @returns {[ Tag ]}
 */
const noteTags = async (note, args, context, info) => {
  try {
    await note.populate('tags').execPopulate()
    return note.tags
    // return Promise.all(
    //   note.tags.map(({ id }) => TagModel.findById(mongoose.Types.ObjectId(id)))
    // )
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error getting users of ${note.title}: ${error.message}`, '400')
  }
}

module.exports = {
  noteTags
}
