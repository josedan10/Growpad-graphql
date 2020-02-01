const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')

const schema = require('./graphql')

const {
  SERVER_PORT,
  SERVER_HOST,
  IN_PROD
} = require('./config')

const { formatError } = require('./errors')

require('./db')

const app = express()

// Setup variables
const port = SERVER_PORT
const host = SERVER_HOST
const gqlServer = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res }),
  playground: IN_PROD ? (false) : {
    'request.credentials': 'include'
  },
  formatError
})

app.use(cors())
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('It\'s works'))
gqlServer.applyMiddleware({ app })

app.listen(port, host, () => console.log(`The server is running on port ${port}!`))
