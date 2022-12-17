import { FC, memo } from 'react'
import { Layout } from './Layout'

type Props = {
  text: string
}

const Content: FC<Props> = ({ text }) => {
  if (text === '') return null

  return (
    <Layout>
      <h2>Note</h2>
      <div className='note' dangerouslySetInnerHTML={{ __html: text }} />
    </Layout>
  )
}

export const Note = memo(Content)
