const { ApolloError } = require('apollo-server-express')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

// Model
const InterestModel = require('../../../models/Interest')
const UserModel = require('../../../models/User')

const addUserToInterest = async (parent, { userId, name }, context, info) => {
  try {
    name = name.toLowerCase()
    let interestExists = await InterestModel.findOne({ name })
    let interest

    if (!interestExists) {
      interest = new InterestModel({ name, users: [ObjectId(userId)] })
      interest = await interest.save()
    } else {
      interest = await InterestModel.findOneAndUpdate({ name },
        {
          $addToSet: {
            users: ObjectId(userId)
          }
        }
      )
    }

    return interest
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error creating Interest: ${error.message}`)
  }
}

const removeUserFromInterest = async (parent, { userId, interestId }, context, info) => {
  try {
    await UserModel.findOneAndUpdate({ _id: ObjectId(userId) },
      {
        $pull: {
          interests: ObjectId(interestId)
        }
      }
    )

    await InterestModel.findOneAndUpdate({ _id: ObjectId(interestId) },
      {
        $pull: {
          users: ObjectId(userId)
        }
      }
    )

    return {
      msg: `User removed from interest`,
      status: 200,
      errors: []
    }
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error removing user from interest: ${error.message}`)
  }
}

module.exports = {
  addUserToInterest,
  removeUserFromInterest
}
