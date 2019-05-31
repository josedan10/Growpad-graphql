export const AUTHENTICATE_USER = 'AUTHENTICATE_USER'
export const HELLO_WORLD = 'HELLO_WORLD'

export const authenticateUser = token => ({
  type: AUTHENTICATE_USER,
  token
})
