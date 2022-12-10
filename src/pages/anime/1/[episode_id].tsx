import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import { searchEpisodeById } from '../../../actions/EpisodesActions'
import { AnimeEpisodeDetail } from '../../../components/AnimeEpisodeDetail'
import { Layout } from '../../../layout/Layout'

type Prop = { episode: EpisodeInfo }

const Content: FC<Prop> = ({ episode }) => {
  return (
    <Layout>
      <AnimeEpisodeDetail episode={episode} />
    </Layout>
  )
}

export default Content

// パスの一覧を生成
export const getStaticPaths: GetStaticPaths = async () => {
  // 全669話分
  const EPISODE_COUNT = 669
  const paths: string[] = Array(EPISODE_COUNT)
    .fill(0)
    .map((_, i) => `/anime/1/${i + 1}`)
  return { paths, fallback: false }
}

// ページデータを生成
export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params === undefined) {
    return { props: {} }
  }

  const q = {
    series: 1,
    id: Number(params.episode_id),
  }

  // 検索の実行
  const episode = await searchEpisodeById(
    'SEARCH_EPISODES',
    q.series,
    q.id,
    true,
  )

  return {
    props: { episode: episode[0] },
  }
}
