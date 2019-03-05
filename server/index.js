const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const app = express()

// Setup variables
const port = process.env.SERVER_PORT || 3000
const host = process.env.SERVER_HOST || 'localhost'

// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('It\'s works'))

app.listen(port, host, () => console.log(`The server is running on port ${port}!`))
