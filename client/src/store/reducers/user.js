// actions
import { SET_USER_PROFILE, UPDATE_USER_LISTS } from '../actions/user'

const initState = {
  profile: null,
  lists: null
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      }

    case UPDATE_USER_LISTS:
      return {
        ...state,
        lists: action.lists
      }

    default:
      return state
  }
}

export default userReducer
