const mongoose = require('mongoose')
const { schemaOptions } = require('./AuxSchemas')
// const UserModel = require('./User')

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The tagname is required.']
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    }
  ]
}, schemaOptions)

module.exports = mongoose.model('Tag', tagSchema)
