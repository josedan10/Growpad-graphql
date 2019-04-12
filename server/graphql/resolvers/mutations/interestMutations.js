const { ApolloError } = require('apollo-server-express')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

// Model
const InterestModel = require('../../../models/Interest')
const UserModel = require('../../../models/User')

let uid = '5c8b23ac145b1136f4b6b244'

const addUserToInterest = async (parent, { name }, context, info) => {
  try {
    let userId = mongoose.Types.ObjectId(uid)
    name = name.toLowerCase()
    return InterestModel.findOneAndUpdate({ name },
      {
        $addToSet: {
          users: ObjectId(userId)
        }
      },
      { upsert: true, new: true }
    )
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error creating Interest: ${error.message}`)
  }
}

const removeUserFromInterest = async (parent, { id }, context, info) => {
  try {
    let userId = ObjectId(uid)

    await InterestModel.findOneAndUpdate({ _id: ObjectId(id) },
      {
        $pull: {
          users: ObjectId(userId)
        }
      }
    )

    return UserModel.findOneAndUpdate({ _id: ObjectId(userId) },
      {
        $pull: {
          interests: ObjectId(id)
        }
      },
      {
        new: true
      }
    )
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error removing user from interest: ${error.message}`)
  }
}

module.exports = {
  addUserToInterest,
  removeUserFromInterest
}
