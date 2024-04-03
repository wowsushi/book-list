import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { fetchBook, getLikeList } from '@/store/epics/BookEpic'
import { RootState } from '@/store/reducers'

import Card from '../Card'
import Icon, { SvgVariant } from '../Icon'
const BookList = () => {
  const bookStore = useSelector((state: RootState) => state.book)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBook())
    dispatch(getLikeList())
  }, [dispatch])

  return (
    <section>
      <Header>
        <Title>我的書櫃</Title>
        <CancelIcon variant={SvgVariant.CROSS} />
      </Header>
      <BookWrapper>
        {bookStore.bookList.map((book) => (
          <Card key={book.uuid} data={book} />
        ))}
      </BookWrapper>
    </section>
  )
}

export default BookList

const Header = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ theme }) => theme.layout.navbarHeight_mobile + 'px'};
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: ${({ theme }) => theme.palette.gray[100]};
  z-index: ${({ theme }) => theme.zIndex.navBar};
  box-shadow: 0px 4px 5px 0px #0000000d;

  @media (min-width: 768px) {
    justify-content: start;
    border-bottom: 1px solid #cfd7e5;
    box-shadow: initial;
    height: ${({ theme }) => theme.layout.navbarHeight_desktop + 'px'};
  }
`

const Title = styled.h3`
  font-family: PingFang TC;
  font-size: 17px;
  font-weight: 600;
  line-height: 23.8px;

  @media (min-width: 768px) {
    max-width: 1000px;
    width: 100%;
    margin: auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 1rem;
  }
`
const CancelIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);

  @media (min-width: 768px) {
    display: none;
  }
`
const BookWrapper = styled.div`
  display: grid;
  column-gap: 1rem;
  row-gap: 2rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 1.5rem;
  padding-top: ${({ theme }) => `calc(${theme.layout.navbarHeight_mobile}px + 1.5rem)`};

  @media (min-width: 768px) {
    max-width: 1000px;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    column-gap: 1.5rem;
    margin: auto;
    padding-top: ${({ theme }) => `calc(${theme.layout.navbarHeight_desktop}px + 1.5rem)`};
  }
`
