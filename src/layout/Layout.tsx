import { FC, memo, ReactNode } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

type Props = {
  children: ReactNode
}

const Content: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export const Layout = memo(Content)
