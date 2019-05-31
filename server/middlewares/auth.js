const { AuthenticationError } = require('apollo-server-express')
const jwt = require('jsonwebtoken')

const { TOKEN_SECRET, TOKEN_LIFETIME } = require('../config')

// Models
const UserModel = require('../models/User')

const isValidToken = (token) => refreshToken(getPayload(token)) !== ''

const isAdmin = user => user.userType === 'admin'

const getPayload = token => {
  let [, payload] = token.split(' ')

  return payload
}

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

const isAuthenticated = ({ headers }) => {
  let token = headers.authorization

  if (!token) {
    throw new AuthenticationError(`You must be logged in.`, 401)
  }

  return decodeToken(token)
}

const checkLogout = ({ headers }) => {
  const token = headers.authorization

  if (token) {
    throw new AuthenticationError(`You must be logged out.`, 412)
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
  let payload = getPayload(token)
  payload = refreshToken(payload)
  let { id } = jwt.decode(payload)
  return id
}

const createToken = (id) => {
  const payload = { id }
  return jwt.sign(payload, TOKEN_SECRET, {
    expiresIn: TOKEN_LIFETIME
  })
}

const refreshToken = (payload) => {
  try {
    jwt.verify(payload, TOKEN_SECRET)
  } catch (error) {
    if (error.message === 'jwt expired') {
      let { id } = jwt.decode(payload)
      payload = createToken(id)
    } else {
      // invalid signature
      payload = ''
    }
  }

  return payload
}

module.exports = {
  attemptLogin,
  logout,
  isAuthenticated,
  checkLogout,
  checkAdminUser,
  isValidToken,
  decodeToken,
  createToken,
  refreshToken
}
