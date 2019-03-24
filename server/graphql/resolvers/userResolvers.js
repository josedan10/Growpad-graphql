const mongoose = require('mongoose')
const { ApolloError } = require('apollo-server-express')

// Models
const InterestModel = require('../../models/Interest')
const ListModel = require('../../models/List')
const UserModel = require('../../models/User')
const NoteModel = require('../../models/Note')

const userInterests = async (user, args, context, info) => {
  try {
    await user.populate('interests').execPopulate()
    return user.interests
    // return Promise.all(
    //   user.interests.map(({ id }) => InterestModel.findById(mongoose.Types.ObjectId(id)))
    // )
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error getting interests of ${user.username}: ${error.message}`, '400')
  }
}

const userLists = async (user, args, context, info) => {
  try {
    await user.populate('lists').execPopulate()
    return user.lists
    // return Promise.all(
    //   user.lists.map(({ id }) => ListModel.findById(mongoose.Types.ObjectId(id)))
    // )
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error getting lists of ${user.username}: ${error.message}`, '400')
  }
}

const userNotes = async (user, args, context, info) => {
  try {
    // return Promise.all(
    //   user.notes.map(({ id }) => NoteModel.findById(mongoose.Types.ObjectId(id)))
    // )
    await user.populate('notes').execPopulate()
    return user.notes
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error getting notes of ${user.username}: ${error.message}`, '400')
  }
}

const createdBy = async (object, args, context, info) => {
  try {
    await object.populate('createdBy').execPopulate()
    return object.createdBy
    // return await UserModel.findById(mongoose.Types.ObjectId(object.createdBy))
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error getting user: ${error.message}`)
  }
}

const sharedWith = async (object, args, context, info) => {
  try {
    await object.populate('sharedWith').execPopulate()
    return object.sharedWith
    // return Promise.all(
    //   object.sharedWith.map(({ id }) => UserModel.findById(mongoose.Types.ObjectId(id)))
    // )
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error getting user: ${error.message}`)
  }
}

module.exports = {
  userInterests,
  userLists,
  userNotes,
  createdBy,
  sharedWith
}
