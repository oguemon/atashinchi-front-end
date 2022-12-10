import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { searchEpisodeById } from '../../../actions/EpisodesActions'
import { AnimeEpisodeDetail } from '../../../components/AnimeEpisodeDetail'
import { HeadElements } from '../../../components/HeadElements'
import { top_page_title } from '../../../define/Links'
import { Layout } from '../../../layout/Layout'
import { getFullURL } from '../../../util/getFullURL'
import { renderMarkdown } from '../../../util/renderMarkdown'

type Prop = { episode: EpisodeInfo }

const Content: FC<Prop> = ({ episode }) => {
  const router = useRouter()

  // ページタイトル・URLの作成
  const title = episode.title + '｜#' + episode.id + '｜' + top_page_title
  const url = getFullURL(router.asPath)

  return (
    <>
      <HeadElements
        title={title}
        description={
          episode.outline ??
          'アニメあたしンちのエピソードをひたすら紹介します。'
        }
        ogp={{ url }}
      />
      <Layout>
        <AnimeEpisodeDetail
          share_title={title}
          share_url={url}
          episode={episode}
        />
      </Layout>
    </>
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

  if (episode[0].detail) {
    episode[0].detail.notes = renderMarkdown(episode[0].detail.notes)
  }

  return {
    props: { episode: episode[0] },
  }
}
