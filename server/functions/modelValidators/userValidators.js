const Joi = require('joi')

const username = Joi.string().alphanum().max(255).required().label('Username')
const email = Joi.string().min(10).max(50).required().email().label('Email')
const password = Joi.string().min(6).max(20).required().label('Password')
const passwordConf = Joi.string().min(6).max(20).required().label('Password Confirmation')
const firstName = Joi.string().max(255).required().label('FirstName')
const lastName = Joi.string().max(255).required().label('LastName')
const sex = Joi.string().length(1, 'utf8').required().label('Sex')
const birthDate = Joi.date().min('1-1-1900').max('now')

const signUpValidator = Joi.object().keys({
  username,
  email,
  password,
  passwordConf,
  firstName,
  lastName,
  sex,
  birthDate
})

const loginValidator = Joi.object().keys({
  username,
  password
})

module.exports = {
  signUpValidator,
  loginValidator
}
