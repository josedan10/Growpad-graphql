// Mutations
const {
  signUp,
  createList,
  changeListTitle,
  deleteList,
  addItemToList,
  modifyListItem,
  deleteListItem
} = require('./mutations/userMutations')

// Queries
const {
  getUsers,
  getUserById,
  getUserByUsername,
  getUserListById,
  getUserLists,
  getListsByTitle,
  getListsByTag
} = require('./queries/userQueries')

const resolvers = {
  Query: {
    getUsers,
    getUserById,
    getUserByUsername,
    getUserListById,
    getUserLists,
    getListsByTitle,
    getListsByTag
  },

  Mutation: {
    signUp,
    createList,
    changeListTitle,
    deleteList,
    addItemToList,
    modifyListItem,
    deleteListItem
  }
}

module.exports = resolvers
