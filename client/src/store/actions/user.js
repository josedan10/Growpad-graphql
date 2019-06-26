export const SET_USER_PROFILE = 'SET_USER_PROFILE'
export const UPDATE_USER_LISTS = 'UPDATE_USER_LISTS'

export const setUserProfile = profile => ({
  type: SET_USER_PROFILE,
  profile
})

export const updateUserLists = lists => ({
  type: UPDATE_USER_LISTS,
  lists
})
