const mongoose = require('mongoose')

const interestSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'This interest already exists.']
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: { unique: true, dropDups: true }
    }
  ]
})

module.exports = mongoose.model('Interest', interestSchema)
