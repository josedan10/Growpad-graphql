const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

// Connect to mongoose

mongoose.connect('mongodb://eCommerce:app123@127.0.0.1:27017/eCommerceDB')
mongoose.connection.once('open', () => {
  console.log('Connected to database')
})

/// //////////////////////////////////////////////////

const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({

  schema,
  graphiql: true

}))

app.listen(4000, () => {
  console.log('Express server start in port 4000')
})
