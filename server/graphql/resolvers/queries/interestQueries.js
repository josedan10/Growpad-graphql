const mongoose = require('mongoose')
const { ApolloError } = require('apollo-server')

// Models
const InterestModel = require('../../../models/Interest')

const getInterests = async (parent, args, context, info) => {
  try {
    return await InterestModel.find({})
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error getting the interests.`)
  }
}

module.exports = {
  getInterests
}
