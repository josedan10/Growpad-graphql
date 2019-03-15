const mongoose = require('mongoose')
const moment = require('moment')
const { ApolloError } = require('apollo-server-express')

// Models
const NoteModel = require('../../../models/Note')
const UserModel = require('../../../models/User')

let uid = '5c8b23ac145b1136f4b6b244'

const createNote = async (parent, args, context, info) => {
  let userId = mongoose.Types.ObjectId(uid)

  try {
    let note = await NoteModel.create(args)

    console.log(note)

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
      msg: `Created note.`,
      status: 200,
      errors: []
    }
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error creating note: ${error.message}`)
  }
}

module.exports = {
  createNote
}
