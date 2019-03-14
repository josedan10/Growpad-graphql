const mongoose = require('mongoose')
const { schemaOptions } = require('./AuxSchemas')
// const UserModel = require('./User')

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The tagname is required.'],
    unique: [true, 'This tagname already exists.']
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: { unique: true, dropDups: true }
    }
  ]
}, schemaOptions)

module.exports = mongoose.model('Tag', tagSchema)
