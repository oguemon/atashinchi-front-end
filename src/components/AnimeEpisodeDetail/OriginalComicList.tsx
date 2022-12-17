import { FC, memo } from 'react'
import { Layout } from './Layout'
import { OriginalComic } from './OriginalComic'

type Props = {
  comics: ComicInfo[]
}

const Content: FC<Props> = ({ comics }) => {
  if (comics.length === 0) return null

  return (
    <Layout>
      <h2>原作情報</h2>
      {
        // 原作の数だけ回す
        comics.map((comic, index) => {
          return <OriginalComic key={index} comic={comic} />
        })
      }
    </Layout>
  )
}

export const OriginalComicList = memo(Content)
