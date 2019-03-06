const fs = require('fs')
const path = require('path')
const { makeExecutableSchema, addMockFunctionsToSchema, mergeSchemas } = require('graphql-tools')

const resolvers = require('./resolvers')
const fileUserSchema = fs.readFileSync(path.resolve('./graphql/schemas/user.gql'), 'utf8')
const fileQueries = fs.readFileSync(path.resolve('./graphql/queries/users.gql'), 'utf8')

const fileSchema = makeExecutableSchema({ typeDefs: fileUserSchema + '\n' + fileQueries})
// const Queries = makeExecutableSchema({typeDefs: fileQueries})
addMockFunctionsToSchema({ schema: fileSchema })

// addMockFunctionsToSchema({ schema: Queries })

const schema = mergeSchemas({
  schemas: [
    fileSchema
  ],
  resolvers
})

module.exports = schema

