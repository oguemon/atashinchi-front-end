import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { searchEpisodeById } from '../../../actions/EpisodesActions'
import { AnimeEpisodeDetail } from '../../../components/AnimeEpisodeDetail'
import { OGP } from '../../../components/OGP'
import { top_page_title } from '../../../define/Links'
import { Layout } from '../../../layout/Layout'

type Prop = { episode: EpisodeInfo }

const Content: FC<Prop> = ({ episode }) => {
  const router = useRouter()

  // ページタイトル・URLの作成
  const page_title: string =
    episode.title + '｜#' + episode.id + '｜' + top_page_title
  const page_url: string = router.pathname

  // OGP要素を入れる
  const OGP_info: OGPInfo = {
    title: page_title,
    url: page_url,
  }
  if (episode.outline !== '') {
    OGP_info.description = episode.outline
  }

  return (
    <>
      <Head>
        <title>{page_title}</title>
      </Head>
      <OGP {...OGP_info} />
      <Layout>
        <AnimeEpisodeDetail
          share_title={page_title}
          share_url={page_url}
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

  return {
    props: { episode: episode[0] },
  }
}
