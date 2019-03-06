const UserModel = require('../../models/User')

const resolvers = {
  Query: {
    users: async () => {
      let response = await UserModel.find({})

      console.log(response)
      return response
    }
  }
}

module.exports = resolvers
