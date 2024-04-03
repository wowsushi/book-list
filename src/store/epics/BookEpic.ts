import { Epic, ofType } from 'redux-observable'
import { map, mergeMap, of } from 'rxjs'
import { ajax } from 'rxjs/ajax'

import { getItem, setItem, STORAGE_KEYS } from '@/utils'

import { ActionWithPayload, BOOK_ACTION } from '../actions/BookAction'
import { RootState } from '../reducers'
const corsURL = 'https://cors-anywhere.herokuapp.com/'
const apiUrl = 'https://mservice.ebook.hyread.com.tw/exam/user-list'

export interface Book {
  uuid: number
  title: string
  coverUrl: string
  publishDate: string
  publisher: string
  author: string
}
export interface BookState {
  bookList: Book[]
  likeList: Record<string, number>
  initialized: boolean
}

export const fetchBook = () => ({ type: BOOK_ACTION.FETCH_BOOK })
const fetchBookFulfilled = (payload: BookState['bookList']) => ({
  type: BOOK_ACTION.FETCH_BOOK_FULFILLED,
  payload,
})

export const fetchBookEpic: Epic<unknown, unknown, RootState> = (action$) =>
  action$.pipe(
    ofType(BOOK_ACTION.FETCH_BOOK),
    mergeMap(() =>
      ajax
        .getJSON(`${corsURL}${apiUrl}`)
        .pipe(map((response) => fetchBookFulfilled(response as BookState['bookList']))),
    ),
  )

export const toggleLike = (uuid: number) => ({ type: BOOK_ACTION.TOGGLE_LIKE, payload: uuid })
const toggleLikeFulfilled = (payload: Record<string, number>) => ({
  type: BOOK_ACTION.TOGGLE_LIKE_FULFILLED,
  payload,
})

export const toggleLikeEpic: Epic<unknown, unknown, RootState> = (action$, state$) =>
  action$.pipe(
    ofType(BOOK_ACTION.TOGGLE_LIKE),
    mergeMap((action: ActionWithPayload<number>) => {
      const targetId = action.payload
      const currentLikes = state$.value.book.likeList || {}
      const { [targetId]: isInList, ...listWithoutTarget } = currentLikes
      const updatedLikes = isInList ? listWithoutTarget : { ...currentLikes, [action.payload]: 1 }
      setItem(STORAGE_KEYS.USER_LIKE_ITEMS, JSON.stringify(updatedLikes))
      return of(toggleLikeFulfilled(updatedLikes))
    }),
  )

export const getLikeList = () => ({ type: BOOK_ACTION.GET_LIKE_LIST })
const getLikeListFulfilled = (payload: Record<string, number>) => ({
  type: BOOK_ACTION.GET_LIKE_LIST_FULFILLED,
  payload,
})

export const getLikeListEpic: Epic<unknown, unknown, RootState> = (action$) =>
  action$.pipe(
    ofType(BOOK_ACTION.GET_LIKE_LIST),
    mergeMap(() => {
      const jsonString = getItem(STORAGE_KEYS.USER_LIKE_ITEMS) || ''
      const likeList = JSON.parse(jsonString)
      return of(getLikeListFulfilled(likeList))
    }),
  )

export default [fetchBookEpic, toggleLikeEpic, getLikeListEpic]
