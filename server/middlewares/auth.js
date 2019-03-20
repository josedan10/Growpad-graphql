const { AuthenticationError } = require('apollo-server-express')

const { SESS_NAME } = require('../config')

// Models
const UserModel = require('../models/User')

const loggedIn = req => req.session.uid
const isAdmin = req => req.session.userType === 'admin'

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

const checkLogin = (req) => {
  if (!loggedIn(req)) {
    throw new AuthenticationError(`You must be logged in.`, 401)
  }
  return loggedIn(req)
}

const checkLogout = (req) => {
  if (loggedIn(req)) {
    throw new AuthenticationError(`You are already logged in.`, 412)
  }
}

const logout = (req, res) => new Promise((resolve, reject) => {
  req.session.destroy(error => {
    if (error) reject(error)

    res.clearCookie(SESS_NAME)
    resolve(true)
  })
})

const checkAdminUser = (req) => {
  if (!isAdmin(req)) {
    throw new AuthenticationError(`You don't have permisions access to this info.`, 401)
  }
  return isAdmin(req)
}

module.exports = {
  attemptLogin,
  logout,
  checkLogin,
  checkLogout,
  checkAdminUser
}
