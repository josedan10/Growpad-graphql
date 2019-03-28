const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const ConnectRedis = require('connect-redis')
const { ApolloServer } = require('apollo-server-express')

const schema = require('./graphql')

const {
  SERVER_PORT,
  SERVER_HOST,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  IN_PROD
} = require('./config')

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
  }
})

const RedisStore = ConnectRedis(session)
// const store = new RedisStore({
//   host: REDIS_HOST,
//   port: REDIS_PORT,
//   pass: REDIS_PASSWORD
// })

app.use(cors())
app.use(session({
  // store,
  name: SESS_NAME,
  secret: SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: true,
    secure: IN_PROD
  }
}))
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('It\'s works'))

gqlServer.applyMiddleware({ app })

app.listen(port, host, () => console.log(`The server is running on port ${port}!`))
