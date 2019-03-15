// Mutations
const userMutations = require('./mutations/userMutations')
const tagsMutations = require('./mutations/tagsMutations')
const interestMutations = require('./mutations/interestMutations')
const listMutations = require('./mutations/listMutations')
const notesMutations = require('./mutations/notesMutations')

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
  userNotes,
  sharedWith,
  createdBy
} = require('./userResolvers')

const {
  interestUsers
} = require('./interestResolvers')

const {
  listTags
} = require('./listResolvers')

const {
  noteTags
} = require('./noteResolvers')

const resolvers = {
  User: {
    interests: userInterests,
    lists: userLists,
    notes: userNotes
  },

  Tag: {
    users: tagUsers
  },

  Interest: {
    users: interestUsers
  },

  List: {
    tags: listTags,
    sharedWith,
    createdBy
  },

  Note: {
    tags: noteTags,
    sharedWith,
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
    ...listMutations,
    ...notesMutations
  }
}

module.exports = resolvers
