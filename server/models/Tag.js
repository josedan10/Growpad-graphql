const mongoose = require('mongoose')
const moment = require('moment')
const schemaOptions = require('./schemaOptions')

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The tagname is required.'],
    unique: [true, 'This tagname already exists.'],
    index: true
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, schemaOptions)

tagSchema.pre('update', function (next) {
  this.update({}, { $set: { updatedAt: moment() } })
  next()
})

module.exports = mongoose.model('Tag', tagSchema)
