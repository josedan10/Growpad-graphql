/**
 * example:
 * {
 *  username: "josedan10",
 *  password: "*******",
 *  firstName: "Jose Daniel",
 * }
 */

const mongoose = require('mongoose')
const moment = require('moment')
const validate = require('validate.js')
const bcrypt = require('bcrypt-nodejs')

const HASH_SALT_AROUNDS = process.env.HASH_SALT_AROUNDS || 10

const schemaOptions = {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
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
    checked: Boolean
  }],
  created_at: {
    type: Date,
    default: moment()
  },
  updated_at: {
    type: Date,
    default: moment()
  }
})

// The user can create notes
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    default: moment().format('ddd, MMM Do YYYY at h:mm:ss')
  },
  content: String,
  created_at: {
    type: Date,
    default: moment()
  },
  updated_at: {
    type: Date,
    default: moment()
  }
})

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
  movements: [{
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
  }]
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'The username is required.'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'The email is required'],
    unique: true,
    validate: {
      validator: (email) => (
        validate.single(email, { presence: true, email: true }) === undefined
      ),
      message: 'Invalid email format'
    }
  },
  password: {
    type: String,
    required: [true, 'The password is required.'],
    validate: {
      validator: (pass) => pass === this.passConf,
      message: 'The passwords must match'
    }
  },
  firstName: {
    type: String,
    required: [true, 'The first name is required.']
  },
  lastName: {
    type: String,
    required: [true, 'The last name is required.']
  },
  birthDate: {
    type: Date,
    required: [true, 'You must specify your birth date']
  },
  sex: {
    type: String,
    enum: ['M', 'F'],
    required: [true, 'You must specified your sex.']
  },
  notes: [noteSchema],
  lists: [listSchema],
  type: {
    type: String,
    enum: ['premium', 'admin', 'standard'],
    default: 'standard'
  },
  language: {
    type: String,
    enum: ['en', 'es', 'pt'],
    default: 'es'
  },
  wallets: [walletSchema]
}, schemaOptions)

userSchema
  .virtual('password_confirmation')
  .get(() => {
    return this.passConf
  })
  .set((passConf) => {
    this.passConf = passConf
  })

userSchema.pre('save', function (next) {
  let user = this

  if (user.isModified('password')) {
    let salt = bcrypt.genSaltSync(HASH_SALT_AROUNDS)
    user.password = bcrypt.hashSync(user.password, salt)
  }

  return next()
})

module.exports = mongoose.model('User', userSchema)
