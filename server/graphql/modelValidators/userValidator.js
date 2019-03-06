const Joi = require('joi')

const userValidatorSchema = Joi.object().keys({
  username: Joi.string().alphanum().max(255).required().label('Username'),
  email: Joi.string().min(10).max(50).required().email().label('Email'),
  password: Joi.string().min(6).max(20).required().label('Password'),
  firstName: Joi.string().max(255).required().label('FirstName'),
  lastName: Joi.string().max(255).required().label('lastName'),
  sex: Joi.string().length(1, 'utf8').required().label('Sex'),
  birthDate: Joi.date().min('1-1-1900').max('now')
})

module.exports = userValidatorSchema
