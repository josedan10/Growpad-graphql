// actions
import { SET_USER_PROFILE } from '../actions/user'

const initState = {
  profile: null
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      }

    default:
      return state
  }
}

export default userReducer
