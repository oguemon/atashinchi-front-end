import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { searchAllEpisodes } from '../actions/EpisodesActions'
import { About } from '../components/About'
import { AllEpisodes } from '../components/AllEpisodes'
import { OGP } from '../components/OGP'
import { top_page_title } from '../define/Links'
import { Layout } from '../layout/Layout'

type Prop = {
  episodes: EpisodeInfo[]
}

const Top: FC<Prop> = ({ episodes }) => {
  const router = useRouter()

  // ページタイトル・URLの作成
  const page_title: string = top_page_title
  const page_url: string = router.asPath

  // OGP要素を入れる
  const OGP_info: OGPInfo = {
    title: page_title,
    url: page_url,
  }

  return (
    <>
      <Head>
        <title>{page_title}</title>
      </Head>
      <OGP {...OGP_info} />
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
  const episodes = await searchAllEpisodes('FETCH_ALL_EPISODES', 0)

  return {
    props: {
      episodes,
    },
  }
}
