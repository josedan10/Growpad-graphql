// actions
import { AUTHENTICATE_USER } from '../actions/auth'

const initState = {
  authenticated: false,
  user: null,
  error: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        authenticated: true,
        user: action.user
      }

    default:
      return state
  }
}

export default authReducer
