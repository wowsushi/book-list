import { applyMiddleware, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import rootEpic from './epics'
import rootReducer, { ActionTypes, RootState } from './reducers'
const epicMiddleware = createEpicMiddleware<unknown, unknown, RootState>()

function configureStore() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const store = createStore<any, ActionTypes, any, any>(
    rootReducer,
    applyMiddleware(epicMiddleware),
  )

  epicMiddleware.run(rootEpic)

  return store
}

const store = configureStore()

export { store }
