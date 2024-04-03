import styled, { keyframes } from 'styled-components'

type Props = {
  children?: React.ReactNode
}
const Skeleton = ({ children, ...props }: Props) => {
  return <Box {...props}>{children}</Box>
}

export default Skeleton
const Animation = keyframes`
  0% {
    background-position: -100px;
  }
  80%,
  100% {
    background-position: 270px;
  }
`

const Box = styled.div`
  background: linear-gradient(90deg, #e8e8e8 0px, #f8f8f8 40px, #e8e8e8 80px);
  background-size: 350px;
  width: 100%;
  height: 1.45rem;
  border-radius: 3px;
  margin-top: 1.5rem;
  animation: ${Animation} 2s infinite;
`
