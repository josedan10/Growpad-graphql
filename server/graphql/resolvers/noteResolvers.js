const mongoose = require('mongoose')
const { ApolloError } = require('apollo-server-express')

// Models
const TagModel = require('../../models/Tag')

const noteTags = (note) => {
  try {
    return Promise.all(
      note.tags.map(({ id }) => TagModel.findById(mongoose.Types.ObjectId(id)))
    )
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error getting users of ${note.title}: ${error.message}`, '400')
  }
}

module.exports = {
  noteTags
}
