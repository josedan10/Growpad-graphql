const { gql } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

const TypeDef = gql`

  type Item {
    name: String!
    checked: Boolean
  }

  type List {
    title: String!
    items: [Item]
    created_at: Int!
    updated_at: Int!
  }

  type Note {
    title: String
    content: String
    created_at: Int!
    updated_at: Int!
  }

  enum MovementType {
    deposit
    withdrawal
  }

  type Movement {
     type: MovementType!
    amount: Float!
    date: Int!
  }

  type Wallet {
    name: String!
    description: String
    balance: Float
    movements
  }

  enum Sex {
    M
    F
  }

  enum UserType {
    premium
    admin
    standard
  }

  type User {
    _id: ID
    userName: String!
    password: String!
    firstName: String!
    lastName: String!
    birthDate: String!
    sex: Sex!
    notes: [Note]
    lists: [List]
    type: UserType!
    wallets: [Wallet]
  }
`
module.exports = makeExecutableSchema({ typeDefs: TypeDef })
