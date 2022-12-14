import Link from 'next/link'
import { useState, memo, FC } from 'react'
import { Waypoint } from 'react-waypoint'
import { EpisodeCard } from '../../src/components/EpisodeCard'
import { searchAllEpisodes } from '../actions/EpisodesActions'
import search_icon from '../img/search.svg'

type Props = {
  episodes: EpisodeInfo[]
}

const Content: FC<Props> = ({ episodes: initial_episodes }) => {
  // 取得結果を蓄えるState
  const [episodes, setEpisodes] = useState<EpisodeInfo[]>(initial_episodes)

  const fetchNextEpisodes = async () => {
    // 次の取得話数
    const next_offset: number = episodes.length

    // エピソードの取得
    if (next_offset < 670) {
      const to_add_episodes = await searchAllEpisodes(next_offset)

      // 既存のエピソードに追記する
      setEpisodes((state) => {
        return [...state, ...to_add_episodes]
      })
    }
  }

  // カードのリストを作成する
  const episode_cards = episodes.map((episode) => {
    // キーは、期数-作品No
    const key: string = episode.series + '-' + episode.id

    return <EpisodeCard key={key} {...episode} />
  })

  return (
    <div className='wrapper'>
      <div className='content-wrapper'>
        <h2>エピソード一覧</h2>
        <Link className='search-btn' href='/search'>
          <img src={search_icon.src} alt='検索' />
          <span>エピソード検索</span>
        </Link>
        {episode_cards}
        <Waypoint onEnter={fetchNextEpisodes} />
      </div>
    </div>
  )
}

export const AllEpisodes = memo(Content)
