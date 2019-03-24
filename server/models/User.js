/**
 * example:
 * {
 *  username: "josedan10",
 *  password: "*******",
 *  firstName: "Jose Daniel",
 * }
 */

const mongoose = require('mongoose')
const validate = require('validate.js')
const bcrypt = require('bcrypt-nodejs')
const moment = require('moment')
const schemaOptions = require('./schemaOptions')

const HASH_SALT_AROUNDS = process.env.HASH_SALT_AROUNDS || 10

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'The username is required.'],
    maxlength: [100, 'The username is too long.'],
    unique: [true, 'This username already exists.'],
    index: true
  },
  email: {
    type: String,
    required: [true, 'The email is required.'],
    unique: [true, 'This email is already been used.'],
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
    maxlength: [100, 'The password is too long.'],
    minlength: [8, 'The password is too short.'],
    validate: {
      validator: function (pass) {
        return this.passConf === undefined || this.passConf === pass
      },
      message: 'The passwords must match'
    }
  },
  firstName: {
    type: String,
    required: [true, 'The firstname is required.'],
    maxlength: [255, 'The lastname is too long.']
  },
  lastName: {
    type: String,
    required: [true, 'The lastname is required.'],
    maxlength: [255, 'The lastname is too long.']
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
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  }],
  lists: [{
    type: mongoose.Schema.Types.ObjectId,
    index: { unique: true, dropDups: true },
    ref: 'List'
  }],
  wallets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet'
  }],
  interests: [{
    type: mongoose.Schema.Types.ObjectId,
    index: { unique: true, dropDups: true },
    ref: 'Interest'
  }]
}, schemaOptions)

userSchema
  .virtual('password_confirmation')
  .get(function () {
    return this.passConf
  })
  .set(function (passConf) {
    this.passConf = passConf
  })

userSchema.post('validate', function (user, next) {

  if (user.isModified('password')) {
    let salt = bcrypt.genSaltSync(HASH_SALT_AROUNDS)
    user.password = bcrypt.hashSync(user.password, salt)
  } else {
    user.passConf = user.password
  }

  return next()
})

userSchema.pre('update', function (next) {
  this.update({}, { $set: { updatedAt: moment() } })
  next()
})

userSchema.statics.doesntExists = async function (options) {
  return await this.where(options).countDocuments === 0
}

userSchema.methods.matchesPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
