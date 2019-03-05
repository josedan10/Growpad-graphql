const {
  addMockFunctionsToSchema,
  mergeSchemas,
  makeExecutableSchema
} = require('graphql-tools')

const { gql, ApolloServer } = require('apollo-server-express')

const schemas = require('./schemas/user')
const queries = require('./queries/users')

const { importSchema } = require('graphql-import')
const schemasDefinitions = importSchema('./schemas/user.graphql')

addMockFunctionsToSchema(schemas)
addMockFunctionsToSchema(queries)

// module.exports = mergeSchemas({
//   schemas: [
//     schemas,
//     queries
//   ]
// })

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world'
  }
}

// module.exports = makeExecutableSchema({
//   typeDefs,
//   resolvers
// })

module.exports = () => {
  console.log(schemasDefinitions)
}
