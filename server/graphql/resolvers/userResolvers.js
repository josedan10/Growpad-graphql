const mongoose = require('mongoose')
const { ApolloError } = require('apollo-server-express')

// Models
const TagModel = require('../../models/Tag')

const listTags = (list) => {
  try {
    return Promise.all(
      list.tags.map(({ id }) => TagModel.findById(mongoose.Types.ObjectId(id)))
    )
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error getting users of ${list.title}: ${error.message}`, '400')
  }
}

module.exports = {
  listTags
}
