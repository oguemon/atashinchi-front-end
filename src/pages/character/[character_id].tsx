import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { Waypoint } from 'react-waypoint'
import { searchEpisodeByCharacters } from '../../actions/EpisodesActions'
import { EpisodeCard } from '../../components/EpisodeCard'
import { HeadElements } from '../../components/HeadElements'
import { characters, character_profiles } from '../../define/Characters'
import { top_page_title } from '../../define/Links'
import { Layout } from '../../layout/Layout'
import { getFullURL } from '../../util/getFullURL'

type Prop = {
  character: {
    id: string
    name: string
  }
  episodes: EpisodeInfo[]
}

const Character: FC<Prop> = ({ character, episodes: initial_episodes }) => {
  const router = useRouter()

  // ページタイトル・URLの作成
  const title = character.name + '｜' + top_page_title
  const url = getFullURL(router.asPath)

  // 取得結果を蓄えるState
  const [episodes, setEpisodes] = useState<EpisodeInfo[]>(initial_episodes)

  const fetchNextEpisodes = async () => {
    // 次の取得話数
    const next_offset: number = episodes.length

    // エピソードの取得
    if (0 < next_offset && next_offset < 670) {
      const to_add_episodes = await searchEpisodeByCharacters([character.id], next_offset)

      // 既存のエピソードに追記する
      setEpisodes((state) => {
        return [...state, ...to_add_episodes]
      })
    }
  }

  return (
    <>
      <HeadElements
        title={title}
        description='アニメあたしンちのエピソードをひたすら紹介します。'
        ogp={{ url }}
      />
      <Layout>
        <div className='character-profile'>
          <div className='wrapper'>
            <div className='content-wrapper'>
              <h1>{character.name}</h1>
              <div className='description'>
                {character_profiles[character.id]}
              </div>
            </div>
          </div>
        </div>
        <div className='wrapper'>
          <div className='content-wrapper'>
            <h2>{character.name}が登場する話</h2>
            (現在は200話まで対応)
            {episodes.map((episode, i) => (
              <EpisodeCard key={i} {...episode} />
            ))}
          </div>
        </div>
        <Waypoint onEnter={fetchNextEpisodes} />
      </Layout>
    </>
  )
}

export default Character

// パスの一覧を生成
export const getStaticPaths: GetStaticPaths = async () => {
  // キャラクターの数だけ回す
  const paths: string[] = Object.keys(characters).map(
    (key) => `/character/${key}`,
  )

  return { paths, fallback: false }
}

// ページデータを生成
export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params === undefined) {
    return { props: {} }
  }

  const character_id = String(params.character_id)

  // キャラクター
  const character = {
    id: character_id,
    name: characters[character_id],
  }

  const episodes = await searchEpisodeByCharacters([character_id], 0)

  return {
    props: {
      character,
      episodes,
    },
  }
}
