const mongoose = require('mongoose')
const moment = require('moment')
const schemaOptions = require('./schemaOptions')

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please identify your list.']
  },
  items: [{
    name: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      default: false
    }
  }],
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],

  sharedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, schemaOptions)

listSchema.pre('update', function (next) {
  this.update({}, { $set: { updatedAt: moment() } })
  next()
})
module.exports = mongoose.model('List', listSchema)
