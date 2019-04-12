import { createStore, compose } from 'redux'

// Reducers
import authReducer from './reducers/auth'

let store = createStore(compose(authReducer))

export default store
