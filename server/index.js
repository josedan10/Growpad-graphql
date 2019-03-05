const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer, gql } = require('apollo-server-express')

// const schema = require('./graphql')

// console.log(schema())

require('dotenv').config()
require('./config')

const app = express()

// console.log(executableSchema)

// Setup variables
const port = process.env.SERVER_PORT || 4000
const host = process.env.SERVER_HOST || 'localhost'
// const gqlServer = new ApolloServer(executableSchema)

const books = [
  {
    id: 1,
    title: 'Harry Potter and the Chamber of Secrets',
    author_id: 1
  },
  {
    id: 2,
    title: 'Jurassic Park',
    author_id: 2
  }
]

const authors = [
  {
    id: 1,
    name: 'J.K. Rowling',
    age: 47,
    books: [1]
  },
  {
    id: 2,
    name: 'Michael Crichton',
    age: 43,
    books: [2]
  }
]

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const TypeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: Author
  }

  type Author {
    id: ID
    name: String,
    age: Int,
    books: [Book]
  }
`

const Queries = gql`

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
    authors: [Author]
  }
`

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors
  }
}

const gqlServer = new ApolloServer({ typeDefs: [TypeDefs, Queries], resolvers })

app.use(cors())

app.use(bodyParser.json())
app.get('/', (req, res) => res.send('It\'s works'))

gqlServer.applyMiddleware({ app })

app.listen(port, host, () => console.log(`The server is running on port ${port}!`))
