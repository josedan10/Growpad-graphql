const mongoose = require('mongoose')
const moment = require('moment')

const schemaOptions = {
  timestamps: true
}

// The user can't create lists, usually TODOs Lists

const movementSchema = new mongoose.Schema({
  type: {
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
  }
}, schemaOptions)

// The wallets helps the user to administer his finance
const walletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please identify your wallet.']
  },
  description: String,
  balance: {
    type: Number,
    default: 0.00
  },
  movements: [movementSchema]
})

module.exports = {
  walletSchema,
  schemaOptions
}