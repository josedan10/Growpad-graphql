const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer, gql } = require('apollo-server-express')

const schema = require('./graphql')

require('dotenv').config()
require('./config')

const app = express()

// Setup variables
const port = process.env.SERVER_PORT || 4000
const host = process.env.SERVER_HOST || 'localhost'
const gqlServer = new ApolloServer({ schema })

app.use(cors())

app.use(bodyParser.json())
app.get('/', (req, res) => res.send('It\'s works'))

gqlServer.applyMiddleware({ app })

app.listen(port, host, () => console.log(`The server is running on port ${port}!`))
