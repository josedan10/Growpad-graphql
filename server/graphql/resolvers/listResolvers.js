const mongoose = require('mongoose')
const { ApolloError } = require('apollo-server-express')

// Models
const TagModel = require('../../models/Tag')

/**
 * @description: get the list's tags.
 *
 * @param {*} list
 * @returns {[ Tag ]}
 */
const listTags = async (list, args, context, info) => {
  try {
    await list.populate('tags').execPopulate()
    return list.tags
    // return Promise.all(
    //   list.tags.map(({ id }) => TagModel.findById(mongoose.Types.ObjectId(id)))
    // )
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error getting tags of ${list.title}: ${error.message}`, '400')
  }
}

module.exports = {
  listTags
}
