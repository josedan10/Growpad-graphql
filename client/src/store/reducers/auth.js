// actions
import { AUTHENTICATE_USER, LOGOUT } from '../actions/auth'

const initState = {
  authenticated: localStorage.getItem('auth-token') !== null,
  token: localStorage.getItem('auth-token'),
  error: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        authenticated: true,
        token: action.token
      }

    case LOGOUT:
      return {
        ...state,
        authenticated: false,
        token: null
      }

    default:
      return state
  }
}

export default authReducer
