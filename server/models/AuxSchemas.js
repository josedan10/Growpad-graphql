const mongoose = require('mongoose')
const moment = require('moment')

const TagModel = require('./Tag')

const schemaOptions = {
  timestamps: true
}

// The user can't create lists, usually TODOs Lists
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
    ref: 'Tag',
    index: { unique: true, dropDups: true }
  }]
}, schemaOptions)

// The user can create notes
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    default: moment().format('ddd, MMM Do YYYY at h:mm:ss')
  },
  content: String
}, schemaOptions)

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
  schemaOptions,
  noteSchema,
  listSchema
}
