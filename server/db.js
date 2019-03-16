const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT
} = require('./config')

const db = DB_NAME
const dbUser = DB_USERNAME
const dbPassword = DB_PASSWORD
const dbHost = DB_HOST
const dbPort = DB_PORT

/**
 * mongoose.connect('mongodb://username:password@host:port/database?options...');
 * online documentation: https://mongoosejs.com/docs/connections.html
 */

const url = `mongodb://${dbHost}:${dbPort}/${db}`

const options = {
  useNewUrlParser: true,
  // user: dbUser,
  // pass: encodeURIComponent(dbPassword),
  // authdb: 'admin'
}

mongoose.connect(url, options, (error) => {
  if (error) console.log('Error connecting to db', error)
  else console.log(`Connected to mongo at ${url}`)
})
