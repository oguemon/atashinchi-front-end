import { FC, memo, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Content: FC<Props> = ({ children }) => {
  return <div className='box'>{children}</div>
}

export const Layout = memo(Content)
