export const AUTHENTICATE_USER = 'AUTHENTICATE_USER'
export const LOGOUT = 'LOGOUT'
export const HELLO_WORLD = 'HELLO_WORLD'

export const authenticateUser = token => ({
  type: AUTHENTICATE_USER,
  token
})

export const logout = () => {
  localStorage.removeItem('auth-token')

  return {
    type: LOGOUT,
    authenticated: false,
    token: null
  }
}
