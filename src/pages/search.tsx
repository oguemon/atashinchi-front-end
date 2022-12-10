import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { fetchEpisodeNames } from '../actions/EpisodeNamesActions'
import { OGP } from '../components/OGP'
import { SearchForm } from '../components/SearchForm'
import { SearchResult } from '../components/SearchResult'
import { top_page_title } from '../define/Links'
import { Layout } from '../layout/Layout'

type Props = {
  episode_names: string[]
}

const Top: FC<Props> = ({ episode_names }) => {
  const router = useRouter()

  // ページタイトル・URLの作成
  const page_title: string = 'エピソード検索｜' + top_page_title
  const page_url: string = router.asPath

  // OGP要素を入れる
  const OGP_info: OGPInfo = {
    title: page_title,
    url: page_url,
  }

  // クエリの格納
  const [query, setQuery] = useState<string>('')

  return (
    <>
      <Head>
        <title>{page_title}</title>
      </Head>
      <OGP {...OGP_info} />
      <Layout>
        <SearchForm setQuery={setQuery} episode_names={episode_names} />
        <SearchResult query={query} />
      </Layout>
    </>
  )
}

export default Top

// ページデータを生成
export const getStaticProps: GetStaticProps<Props> = async () => {
  const episode_name_info_list = await fetchEpisodeNames()
  const episode_names = episode_name_info_list.map((episode) => episode.title)

  return {
    props: {
      episode_names,
    },
  }
}
