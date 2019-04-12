const mongoose = require('mongoose')
const moment = require('moment')
const { ApolloError } = require('apollo-server-express')

// Models
const NoteModel = require('../../../models/Note')
const UserModel = require('../../../models/User')
const TagModel = require('../../../models/Tag')

const createNote = async (parent, { title = moment().format('ddd MMM Do, YYYY. HH:mm:ss'), content }, { req }, info) => {
  let { uid } = req.session
  let userId = mongoose.Types.ObjectId(uid)

  try {
    let note = await NoteModel.create({ title, content, createdBy: userId })
    return UserModel.findOneAndUpdate(
      {
        _id: userId
      },
      {
        $push: {
          notes: mongoose.Types.ObjectId(note._id)
        }
      },
      { new: true }
    )
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error creating note: ${error.message}`)
  }
}

const modifyNote = async (parent, { id, content, title }, context, info) => {
  try {
    return NoteModel.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      {
        $set: {
          content,
          title
        }
      },
      { new: true }
    )
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error modifying note: ${error.message}.`)
  }
}

const deleteNote = async (parent, { id }, context, info) => {
  try {
    id = mongoose.Types.ObjectId(id)
    return NoteModel.findById({ _id: id })
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error deleting note: ${error.message}`)
  }
}

module.exports = {
  createNote,
  modifyNote,
  deleteNote
}
