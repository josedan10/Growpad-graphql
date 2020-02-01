const { ApolloError } = require('apollo-server-express')
const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const AuthMiddleware = require('../../../middlewares/auth')

// Validators
const { loginValidator } = require('../../../functions/modelValidators')

// Models
const UserModel = require('../../../models/User')

/**
 * @name: signUp
 * @summary: Create the user
 * @tutorial:
 *  Resolvers https://www.youtube.com/watch?v=TIAfjBXsY2E&index=6&list=PLcCp4mjO-z9_y8lByvIfNgA_F18l-soQv
 *  Authentication  https://www.youtube.com/watch?v=zNcNghhKZjo&list=PLcCp4mjO-z9_y8lByvIfNgA_F18l-soQv&index=9
 *                  https://www.youtube.com/watch?v=Ejw9YA3kC3o&list=PLcCp4mjO-z9_y8lByvIfNgA_F18l-soQv&index=10
 *
 * @description:
 *  Successfully status:
 *  * 200: OK
 *  * 201: Created
 *  * 202: Accepted
 *  * 204: No content
 *
 *  Errors:
 *  * 400: Bad Request
 *  * 401: Unauthorized
 *  * 412: Precondition Failed
 *  * 500: Internal Server Error
 *
 * @param {*} parent
 * @param { input } args
 * @param { req } context
 * @param {*} info
 * @returns { User | ApolloError }
 */
const signUp = async (parent, { input }, { req }, info) => {
  try {
    await UserModel.create(input)

    return {
      success: true,
      errors: []
    }
  } catch (error) {
    let errors = []
    for (let key in error.errors) {
      errors.push(error.errors[key])
    }
    let message = error.message.split(':')[0]
    throw new ApolloError(message, '', { typeError: error.name, errors })
  }
}

const login = async (parent, args, { res }, info) => {
  try {
    await Joi.validate(args, loginValidator, { abortEarly: false })

    let user = await AuthMiddleware.attemptLogin(args)

    let token = AuthMiddleware.createToken(user._id)

    res.header('Authorization', 'Bearer ' + token)

    return {
      success: true,
      token,
      errors: []
    }
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error while login the user: ${error.message}`, 500, { errors: error.errors || error.details })
  }
}

const logout = async (parent, args, { req, res }, info) => {
  return AuthMiddleware.logout(res)
}

const changeUserType = async (parent, { id, type }, context, info) => {
  try {
    return await UserModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) },
      {
        $set: { type }
      }
    )
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error changing the user type: ${error.message}`, 400)
  }
}

module.exports = {
  signUp,
  login,
  logout,
  changeUserType
}
