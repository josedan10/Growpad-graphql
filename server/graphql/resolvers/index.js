const Joi = require('joi')
const mongoose = require('mongoose')
const UserModel = require('../../models/User')

const { UserInputError } = require('apollo-server-express')
const {
  userModelValidator
} = require('../modelValidators')

const resolvers = {
  Query: {
    getUsers: async (parent, args, context, info) => UserModel.find({}),
    getUserById: async (parent, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not valid user ID`)
      }

      return UserModel.findById(id)
    }
  },

  Mutation: {
    signUp: async (parent, args, context, info) => {
      let user

      try {
        console.log('User created successfully')
        user = await new UserModel(args)
        return user.save()
      } catch (error) {
        console.log(error)
        return error
      }
    }
  }
}

module.exports = resolvers
