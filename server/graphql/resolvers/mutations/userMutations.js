const mongoose = require('mongoose')
const { ApolloError } = require('apollo-server-express')
const moment = require('moment')
const _ = require('lodash')

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
 * @param {*} args
 * @param {*} context
 * @param {*} info
 * @returns { User | ApolloError }
 */
const signUp = async (parent, { input }, context, info) => {
  let user

  try {
    user = await new UserModel(input)
    return await user.save()
  } catch (error) {
    console.log(error)
    throw new ApolloError(`Error creating user '${input.username}'.`, '400')
  }
}

module.exports = {
  signUp
}
