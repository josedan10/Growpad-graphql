const { AuthenticationError } = require('apollo-server-express')
const jwt = require('jsonwebtoken')

const { SESS_NAME, TOKEN_SECRET } = require('../config')

// Models
const UserModel = require('../models/User')

const isValidToken = token => jwt.verify(token, TOKEN_SECRET)
const isAdmin = user => user.userType === 'admin'

const attemptLogin = async ({ username, password }) => {
  let user = await UserModel.findOne({ username })

  if (!user) {
    throw new AuthenticationError(`User with username '${username}' not found.`, 404)
  }

  if (!user.matchesPassword(password)) {
    throw new AuthenticationError(`Incorrect password.`, 400)
  }

  return user
}

const checkLogin = ({ headers }) => {
  let token = headers.authorization

  if (!token || !isValidToken(token)) {
    throw new AuthenticationError(`You must be logged in.`, 401)
  }
  return isValidToken(token)
}

const checkLogout = ({ headers }) => {
  const token = headers.authorization

  if (token && isValidToken(token)) {
    throw new AuthenticationError(`You are already logged in.`, 412)
  }
}

const logout = (res) => new Promise((resolve, reject) => {
  res.headers.authorization = ''
  resolve(true)
})

const checkAdminUser = (user) => {
  if (!isAdmin(user)) {
    throw new AuthenticationError(`You don't have permisions access to this info.`, 401)
  }
  return isAdmin(user)
}

const decodeToken = (token) => {
  return jwt.decode(token)
}

module.exports = {
  attemptLogin,
  logout,
  checkLogin,
  checkLogout,
  checkAdminUser,
  isValidToken,
  decodeToken
}
