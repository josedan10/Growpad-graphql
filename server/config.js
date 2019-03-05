const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = process.env.DB_NAME
const dbUser = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT

console.log(db, dbUser, dbPassword, dbHost, dbPort)

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
