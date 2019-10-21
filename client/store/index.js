import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {loadState, saveState} from '../localStorage'
import throttle from 'lodash.throttle'

const persistatedState = loadState()

import user from './user'
import renderer from './renderer'
import editor from './editor'
import template from './template'
import undo from './undo'

const reducer = combineReducers({
  user,
  renderer,
  editor,
  template,
  undo
})
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
// )
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(reducer, persistatedState, middleware)

store.subscribe(
  throttle(() => {
    saveState({
      editor: store.getState().editor,
      renderer: store.getState().renderer,
      template: store.getState().template,
      user: store.getState().user
    })
  }, 1000)
)

export default store
export * from './user'
