import { Reducer } from 'redux'

import { BOOK_ACTION } from '../actions/BookAction'
import { BookState } from '../epics/BookEpic'

const initialState: BookState = {
  bookList: [],
  likeList: {},
}
export interface FetchBookAction {
  type: typeof BOOK_ACTION.FETCH_BOOK
}

export interface FetchBookFulfilledAction {
  type: typeof BOOK_ACTION.FETCH_BOOK_FULFILLED
  payload: BookState['bookList']
}

export interface FetchBookFailureAction {
  type: typeof BOOK_ACTION.FETCH_BOOK_FAILURE
  error: Error
}
export interface ToggleLikeAction {
  type: typeof BOOK_ACTION.TOGGLE_LIKE
}

export interface ToggleLikeFulfilledAction {
  type: typeof BOOK_ACTION.TOGGLE_LIKE_FULFILLED
  payload: Record<string, number>
}

export interface ToggleLikeFailureAction {
  type: typeof BOOK_ACTION.TOGGLE_LIKE_FAILURE
  error: Error
}

export interface GetLikeListAction {
  type: typeof BOOK_ACTION.GET_LIKE_LIST
}

export interface GetLikeListFulfilledAction {
  type: typeof BOOK_ACTION.GET_LIKE_LIST_FULFILLED
  payload: Record<string, number>
}

export interface GetToggleLikeListFailureAction {
  type: typeof BOOK_ACTION.TOGGLE_LIKE_FAILURE
  error: Error
}

export type BookActionType =
  | FetchBookAction
  | FetchBookFulfilledAction
  | FetchBookFailureAction
  | ToggleLikeAction
  | ToggleLikeFulfilledAction
  | ToggleLikeFailureAction
  | GetLikeListAction
  | GetLikeListFulfilledAction
  | GetToggleLikeListFailureAction

export const bookReducer: Reducer<BookState, BookActionType> = (state = initialState, action) => {
  switch (action.type) {
    case BOOK_ACTION.FETCH_BOOK_FULFILLED:
      return {
        ...state,
        bookList: action.payload,
      }
    case BOOK_ACTION.TOGGLE_LIKE_FULFILLED:
    case BOOK_ACTION.GET_LIKE_LIST_FULFILLED:
      return {
        ...state,
        likeList: action.payload,
      }

    default:
      return state
  }
}
