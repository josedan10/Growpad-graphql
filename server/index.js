const express = require('express')
const bodyParser = require('body-parser')
const { gql } = require('apollo-server-express')
require('dotenv').config()
require('./config')

const app = express()

// Setup variables
const port = process.env.SERVER_PORT || 4000
const host = process.env.SERVER_HOST || 'localhost'

app.use(bodyParser.json())
app.get('/', (req, res) => res.send('It\'s works'))

app.listen(port, host, () => console.log(`The server is running on port ${port}!`))
