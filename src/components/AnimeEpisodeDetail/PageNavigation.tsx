import Link from 'next/link'
import { FC, memo } from 'react'
import { Layout } from './Layout'

type Props = {
  series: number
  id: number
}

const Content: FC<Props> = ({ series, id }) => {
  const series_num = Number(series)
  const id_num = Number(id)
  const final_episode_no = series_num === 1 ? 669 : 0

  return (
    <Layout>
      <nav className='arrow-navi'>
        {id_num > 1 && (
          <Link href={`/anime/1/${id_num - 1}`} className='arrow-prev'>
            前のエピソード
          </Link>
        )}
        {id_num < final_episode_no && (
          <Link href={`/anime/1/${id_num + 1}`} className='arrow-next'>
            次のエピソード
          </Link>
        )}
      </nav>
    </Layout>
  )
}

export const PageNavigation = memo(Content)
