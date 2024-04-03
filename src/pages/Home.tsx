import { Provider } from 'react-redux'

import BookList from '@/components/BookList'
import { store } from '@/store'

const Home = () => {
  return (
    <Provider store={store}>
      <BookList />
    </Provider>
  )
}

export default Home
