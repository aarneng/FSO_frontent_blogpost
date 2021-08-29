import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'
import { composeWithDevTools } from 'redux-devtools-extension'


const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

console.log(store.getState(), "test")
store.subscribe(() => console.log(store.getState()))


export default store