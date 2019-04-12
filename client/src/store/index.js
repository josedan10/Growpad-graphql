import { createStore, compose } from 'redux'

// Reducers
import { authReducer } from './reducers'

let store = createStore(compose(authReducer))
