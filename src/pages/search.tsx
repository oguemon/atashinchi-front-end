import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { fetchEpisodeNames } from '../actions/EpisodeNamesActions'
import { HeadElements } from '../components/HeadElements'
import { SearchForm } from '../components/SearchForm'
import { SearchResult } from '../components/SearchResult'
import { top_page_title } from '../define/Links'
import { Layout } from '../layout/Layout'
import { getFullURL } from '../util/getFullURL'

type Props = {
  episode_names: string[]
}

const Top: FC<Props> = ({ episode_names }) => {
  const router = useRouter()

  // ページタイトル・URLの作成
  const title = 'エピソード検索｜' + top_page_title
  const url = getFullURL(router.asPath)

  // クエリの格納
  const [query, setQuery] = useState<string>('')

  return (
    <>
      <HeadElements
        title={title}
        description='アニメあたしンちのエピソードをひたすら紹介します。'
        ogp={{ url }}
      />
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
