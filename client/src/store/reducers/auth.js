// actions
import { AUTHENTICATE_USER } from '../actions/auth'

const initState = {
  authenticated: false,
  token: null,
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

    default:
      return state
  }
}

export default authReducer
