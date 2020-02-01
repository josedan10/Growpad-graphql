import { createStore, compose, combineReducers } from 'redux'

// Reducers
import authReducer from './reducers/auth'
import userReducer from './reducers/user'

let store = createStore(
  compose(combineReducers({ auth: authReducer, user: userReducer }))
)

export default store
