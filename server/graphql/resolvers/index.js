const UserModel = require('../../models/User')

const resolvers = {
  Query: {
    getUsers: async (parent, args, context, info) => {
      let response = await UserModel.find({})

      console.log(response)
      return response
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
