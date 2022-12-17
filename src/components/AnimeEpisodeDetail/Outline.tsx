import { FC, memo } from 'react'
import { Layout } from './Layout'

type Props = {
  text: string
}

const Content: FC<Props> = ({ text }) => {
  if (text === '') return null

  return (
    <Layout>
      <h2>あらすじ</h2>
      <div className='outline'>{text}</div>
    </Layout>
  )
}

export const Outline = memo(Content)
