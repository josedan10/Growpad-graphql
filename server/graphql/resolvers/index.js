// Mutations
const userMutations = require('./mutations/userMutations')
const tagsMutations = require('./mutations/tagsMutations')
const interestMutations = require('./mutations/interestMutations')

// Queries
const userQueries = require('./queries/userQueries')
const tagQueries = require('./queries/tagQueries')
const interestQueries = require('./queries/interestQueries')

// Resolvers
const {
  tagUsers
} = require('./tagResolvers')

const {
  listTags,
  userInterests
} = require('./userResolvers')

const {
  interestUsers
} = require('./interestResolvers')

const resolvers = {
  User: {
    interests: userInterests
  },

  Tag: {
    users: tagUsers
  },

  Interest: {
    users: interestUsers
  },

  List: {
    tags: listTags
  },

  Query: {
    ...userQueries,
    ...tagQueries,
    ...interestQueries
  },

  Mutation: {
    ...userMutations,
    ...tagsMutations,
    ...interestMutations
  }
}

module.exports = resolvers
