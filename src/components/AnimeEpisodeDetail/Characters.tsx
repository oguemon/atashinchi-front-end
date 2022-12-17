import Link from 'next/link'
import { FC, memo } from 'react'
import { characters as CHARACTERS } from '../../define/Characters'
import { Layout } from './Layout'

type Props = {
  characters: string[]
}

const Content: FC<Props> = ({ characters }) => {
  if (characters.length === 0) return null

  return (
    <Layout>
      <h2>主な登場人物</h2>
      <div className='character'>
        {characters.map((id) => (
          <Link className='tag' key={id} href={`/character/${id}`}>
            {CHARACTERS[id]}
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export const Characters = memo(Content)
