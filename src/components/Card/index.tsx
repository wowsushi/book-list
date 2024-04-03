import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { useTheme } from 'styled-components'

import { Book, toggleLike } from '@/store/epics/BookEpic'
import { RootState } from '@/store/reducers'

import Icon, { SvgVariant } from '../Icon'
import Text from '../Text'

type Props = {
  data: Book
}
const Card = ({ data }: Props) => {
  const theme = useTheme()
  const bookStore = useSelector((state: RootState) => state.book)
  const dispatch = useDispatch()
  const isLike = useMemo(() => !!bookStore.likeList[data.uuid], [bookStore.likeList, data.uuid])

  const heartIconStatus = useMemo(() => {
    if (isLike) {
      return {
        variant: SvgVariant.HEART_ON,
        color: theme.palette.primary[500],
      }
    }
    return {
      variant: SvgVariant.HEART_OFF,
      color: theme.palette.gray[100],
    }
  }, [isLike, theme.palette.gray, theme.palette.primary])

  const handleToggleHeart = (uuid: number) => {
    dispatch(toggleLike(uuid))
  }
  return (
    <Box>
      <ImageWrapper>
        <Space />
        <Image src={data.coverUrl} alt={data.title} loading="lazy" />
        <Mask />
        <HeartIcon
          variant={heartIconStatus.variant}
          color={heartIconStatus.color}
          onClick={() => handleToggleHeart(data.uuid)}
        />
      </ImageWrapper>
      <Title line={2}>{data.title}</Title>
    </Box>
  )
}

export default Card

const Box = styled.div`
  display: flex;
  flex-direction: column;
`

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
  border-radius: 0.5rem;
`

const Space = styled.div`
  padding-top: ${(71 / 50) * 100}%;
`

const Image = styled.img`
  position: absolute;
  display: block;
  inset: 0px;
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const Title = styled(Text)`
  font-family: PingFang TC;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin-top: 0.25rem;
`

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
`

const HeartIcon = styled(Icon)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`
