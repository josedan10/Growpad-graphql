const mongoose = require('mongoose')
const schemaOptions = require('./schemaOptions')

// The user can't create lists, usually TODOs Lists

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
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag'
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, schemaOptions)

module.exports = mongoose.model('Wallet', walletSchema)
