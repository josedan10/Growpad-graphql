const mongoose = require('mongoose')
const moment = require('moment')
const { ApolloError } = require('apollo-server-express')

// Models
const NoteModel = require('../../../models/Note')
const UserModel = require('../../../models/User')
const TagModel = require('../../../models/Tag')

let uid = '5c8b23ac145b1136f4b6b244'

const createNote = async (parent, { title = moment().format('ddd MMM Do, YYYY. HH:mm:ss'), content }, context, info) => {
  let userId = mongoose.Types.ObjectId(uid)

  try {
    let note = await NoteModel.create({ title, content, createdBy: userId })
    await UserModel.updateOne(
      {
        _id: userId
      },
      {
        $push: {
          notes: mongoose.Types.ObjectId(note._id)
        }
      }
    )

    return {
      msg: `Note created.`,
      status: 200,
      errors: []
    }
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error creating note: ${error.message}`)
  }
}

const modifyNote = async (parent, { id, content, title }, context, info) => {
  try {
    let userId = mongoose.Types.ObjectId(uid)
    await NoteModel.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      {
        $set: {
          content,
          title
        }
      }
    )

    return {
      msg: `Modified note '${title}'.`,
      status: 200,
      errors: []
    }
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error modifying note: ${error.message}.`)
  }
}

const deleteNote = async (parent, { id }, context, info) => {
  try {
    id = mongoose.Types.ObjectId(id)
    await NoteModel.deleteOne({ _id: id })
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
