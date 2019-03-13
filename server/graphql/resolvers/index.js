// Mutations
const userMutations = require('./mutations/userMutations')

const tagsMutations = require('./mutations/tagsMutations')

// Queries
const userQueries = require('./queries/userQueries')

const tagQueries = require('./queries/tagQueries')

// Resolvers
const {
  tagUsers
} = require('./tagResolvers')

const {
  listTags
} = require('./userResolvers')

const resolvers = {
  Tag: {
    users: tagUsers
  },

  List: {
    tags: listTags
  },

  Query: {
    ...userQueries,
    ...tagQueries
  },

  Mutation: {
    ...userMutations,
    ...tagsMutations
  }
}

module.exports = resolvers
