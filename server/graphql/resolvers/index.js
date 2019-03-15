// Mutations
const userMutations = require('./mutations/userMutations')
const tagsMutations = require('./mutations/tagsMutations')
const interestMutations = require('./mutations/interestMutations')
const listMutations = require('./mutations/listMutations')

// Queries
const userQueries = require('./queries/userQueries')
const tagQueries = require('./queries/tagQueries')
const interestQueries = require('./queries/interestQueries')
const listQueries = require('./queries/listQueries')

// Resolvers
const {
  tagUsers
} = require('./tagResolvers')

const {
  userInterests,
  userLists,
  createdBy
} = require('./userResolvers')

const {
  interestUsers
} = require('./interestResolvers')

const {
  listTags
} = require('./listResolvers')

const resolvers = {
  User: {
    interests: userInterests,
    lists: userLists
  },

  Tag: {
    users: tagUsers
  },

  Interest: {
    users: interestUsers
  },

  List: {
    tags: listTags,
    createdBy
  },

  Query: {
    ...userQueries,
    ...tagQueries,
    ...interestQueries,
    ...listQueries
  },

  Mutation: {
    ...userMutations,
    ...tagsMutations,
    ...interestMutations,
    ...listMutations
  }
}

module.exports = resolvers
