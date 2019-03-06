const fs = require('fs')
const path = require('path')
const { makeExecutableSchema, addMockFunctionsToSchema, mergeSchemas } = require('graphql-tools')
const ConstraintDirective = require('graphql-constraint-directive')

const resolvers = require('./resolvers')

// We need read all queries, mutations and schemas definitions

// 1) Read schemas
const schemasDir = fs.readdirSync(path.resolve('./graphql/schemas/'))

// 2) Read queries
const queriesDir = fs.readdirSync(path.resolve('./graphql/queries/'))

// 3) Read mutations
const mutationsDir = fs.readdirSync(path.resolve('./graphql/queries/'))

let schemas = schemasDir.map(fileName => fs.readFileSync(path.resolve(`./graphql/schemas/${fileName}`), 'utf8'))
let queries = queriesDir.map(fileName => fs.readFileSync(path.resolve(`./graphql/queries/${fileName}`), 'utf8'))
let mutations = mutationsDir.map(fileName => fs.readFileSync(path.resolve(`./graphql/mutations/${fileName}`), 'utf8'))

const fileSchema = makeExecutableSchema({
  typeDefs: [...schemas, ...queries, ...mutations],
  resolvers,
  schemaDirectives: { constraint: ConstraintDirective },
  mocks: true
})

const schema = fileSchema

module.exports = schema
