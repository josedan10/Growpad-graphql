const mongoose = require('mongoose')
const schemaOptions = require('./schemaOptions')
const moment = require('moment')

const movementSchema = new mongoose.Schema({
  action: {
    type: String,
    enum: ['deposit', 'withdrawal'],
    required: [true, 'Please, specify the movement type.']
  },
  amount: {
    type: Number,
    default: 0.00
  },
  date: {
    type: Date,
    default: moment()
  },
  wallet: {
    ref: 'Wallet',
    type: mongoose.Schema.Types.ObjectId
  },
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId
  }
}, schemaOptions)

module.exports = mongoose.model('Movement', movementSchema)
