export const AUTHENTICATE_USER = 'AUTHENTICATE_USER'
export const LOGOUT = 'LOGOUT'
export const HELLO_WORLD = 'HELLO_WORLD'

export const authenticateUser = token => {
  localStorage.setItem('auth-token', token)

  return {
    type: AUTHENTICATE_USER,
    token
  }
}

export const logout = () => {
  localStorage.removeItem('auth-token')

  return {
    type: LOGOUT,
    token: null
  }
}
