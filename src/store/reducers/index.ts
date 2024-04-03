import { combineReducers } from 'redux'

import { BookState } from '../epics/BookEpic'
import { BookActionType, bookReducer } from './BookReducer'

export type RootState = {
  book: BookState
}

const reducers = combineReducers({
  book: bookReducer,
})

export type ActionTypes = BookActionType

export default reducers
