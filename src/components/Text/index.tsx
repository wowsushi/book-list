import React from 'react'
import styled from 'styled-components'

type Props = {
  line: number
  children: React.ReactNode
}
const Text = ({ line, children, ...props }: Props) => {
  return (
    <Box $line={line} {...props}>
      {children}
    </Box>
  )
}

export default Text

const Box = styled.p<{ $line: Props['line'] }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ $line }) => $line};
  overflow: hidden;
`
