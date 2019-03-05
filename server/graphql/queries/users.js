const { gql } = require('apollo-server-express')

const Queries = gql`
  type Query {
    getUsers: [User]
  }
`
module.exports = Queries
