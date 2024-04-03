import { combineEpics } from 'redux-observable'

import bookEpic from './BookEpic'

const epics = combineEpics(...bookEpic)

export default epics
