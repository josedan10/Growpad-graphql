const mongoose = require('mongoose')
const moment = require('moment')

const { schemaOptions } = require('./AuxSchemas')

// The user can create notes
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    default: moment().format('ddd, MMM Do YYYY at h:mm:ss')
  },
  content: String,
  sharedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, schemaOptions)

noteSchema.pre('update', function (next) {
  this.update({}, { $set: { updatedAt: moment() } })
  next()
})

module.exports = mongoose.model('Note', noteSchema)