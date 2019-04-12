const fs = require('fs')
const path = require('path')
const { makeExecutableSchema } = require('graphql-tools')

// Directives
const schemaDirectives = require('./directives')

const resolvers = require('./resolvers')

// We need read all queries, mutations and schemas definitions

// Debug resolve

// 1) Read schemas
// const schemasDir = fs.readdirSync(path.resolve('./server/graphql/schemas/'))

// 2) Read queries
// const queriesDir = fs.readdirSync(path.resolve('./server/graphql/queries/'))

// 3) Read mutations
// const mutationsDir = fs.readdirSync(path.resolve('./server/graphql/mutations/'))

// let schemas = schemasDir.map(fileName => fs.readFileSync(path.resolve(`./server/graphql/schemas/${fileName}`), 'utf8'))
// let queries = queriesDir.map(fileName => fs.readFileSync(path.resolve(`./server/graphql/queries/${fileName}`), 'utf8'))
// let mutations = mutationsDir.map(fileName => fs.readFileSync(path.resolve(`./server/graphql/mutations/${fileName}`), 'utf8'))

// 1) Read schemas
const schemasDir = fs.readdirSync(path.resolve('./graphql/schemas/'))

// // 2) Read queries
const queriesDir = fs.readdirSync(path.resolve('./graphql/queries/'))

// // 3) Read mutations
const mutationsDir = fs.readdirSync(path.resolve('./graphql/mutations/'))

let schemas = schemasDir.map(fileName => fs.readFileSync(path.resolve(`./graphql/schemas/${fileName}`), 'utf8'))
let queries = queriesDir.map(fileName => fs.readFileSync(path.resolve(`./graphql/queries/${fileName}`), 'utf8'))
let mutations = mutationsDir.map(fileName => fs.readFileSync(path.resolve(`./graphql/mutations/${fileName}`), 'utf8'))

const fileSchema = makeExecutableSchema({
  typeDefs: [...schemas, ...queries, ...mutations],
  resolvers,
  schemaDirectives
})

const schema = fileSchema

module.exports = schema
