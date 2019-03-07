const mongoose = require('mongoose')
const UserModel = require('../../models/User')

const { UserInputError, ApolloError } = require('apollo-server-express')

const resolvers = {
  Query: {
    getUsers: async (parent, args, context, info) => UserModel.find({}),

    getUserById: async (parent, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not valid user ID`)
      }

      return UserModel.findById(id)
    },

    getUserByUsername: async (parent, { username }, context, info) => {
      try {
        return UserModel.findOne({ username })
      } catch (error) {
        throw new ApolloError(`Error finding user ${username}`, '404')
      }
    }
  },

  Mutation: {
    signUp: async (parent, args, context, info) => {
      let user

      try {
        user = await new UserModel(args)
        console.log('User created successfully')
        return user.save()
      } catch (error) {
        console.log(error)
        return error
      }
    },

    newList: async (parent, { username, title }, context, info) => {
      try {
        return UserModel.findOneAndUpdate(username, {
          $push: { lists: { title } }
        })
      } catch (error) {
        throw new ApolloError(`Error creating ${title} list`)
      }
    }
  }
}

module.exports = resolvers
