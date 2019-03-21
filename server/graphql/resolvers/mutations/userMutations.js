const { ApolloError } = require('apollo-server-express')
const mongoose = require('mongoose')
const Joi = require('joi')
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
    let user = await UserModel.create(input)
    req.session.uid = user.id
    return user
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error creating user '${input.username}'.`, '400')
  }
}

const login = async (parent, args, { req }, info) => {
  try {    
    // console.log(req.session)
    await Joi.validate(args, loginValidator, { abortEarly: false })

    let user = await AuthMiddleware.attemptLogin(args)
    req.session.uid = user.id
    return user
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error while login the user: ${error.message}`)
  }
}

const logout = async (parent, args, { req, res }, info) => {
  return AuthMiddleware.logout(req, res)
}

const changeUserType = async (parent, { id, type }, context, info) => {
  try {
    return await UserModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId() },
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
