import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { searchAllEpisodes } from '../actions/EpisodesActions'
import { About } from '../components/About'
import { AllEpisodes } from '../components/AllEpisodes'
import { HeadElements } from '../components/HeadElements'
import { top_page_title } from '../define/Links'
import { Layout } from '../layout/Layout'
import { getFullURL } from '../util/getFullURL'

type Prop = {
  episodes: EpisodeInfo[]
}

const Top: FC<Prop> = ({ episodes }) => {
  const router = useRouter()

  // ページタイトル・URLの作成
  const title: string = top_page_title
  const url = getFullURL(router.asPath)

  return (
    <>
      <HeadElements
        title={title}
        description='アニメあたしンちのエピソードをひたすら紹介します。'
        ogp={{ url }}
      />
      <Layout>
        <About />
        <AllEpisodes episodes={episodes} />
      </Layout>
    </>
  )
}

export default Top

// ページデータを生成
export const getStaticProps: GetStaticProps<Prop> = async () => {
  const episodes = await searchAllEpisodes(0)

  return {
    props: {
      episodes,
    },
  }
}
