import { useState, memo, ReactNode, FC, useEffect } from 'react'
import { Waypoint } from 'react-waypoint'
import { searchEpisodesByQuery } from '../actions/EpisodesActions'
import { EpisodeCard } from './EpisodeCard'

type Prop = { query: string }

type EpisodeState = {
  is_initial: boolean
  episodes: EpisodeInfo[]
}

const Content: FC<Prop> = ({ query }) => {
  // 検索結果の一覧を蓄えるState
  const [episode_state, setEpisodeState] = useState<EpisodeState>({
    is_initial: true,
    episodes: [],
  })

  const { is_initial, episodes } = episode_state

  useEffect(() => {
    const setInitialSearchResult = async () => {
      const initial_episodes = await searchEpisodesByQuery(
        'SEARCH_EPISODES_NEXT',
        0,
        query,
        0,
        false,
      )

      // 既存のエピソードに追記する
      setEpisodeState({
        is_initial: false,
        episodes: initial_episodes,
      })
    }

    if (query !== '') {
      setInitialSearchResult()
    }
  }, [query])

  const fetchNextEpisodes = async () => {
    // 次の取得話数
    const next_offset: number = episodes.length

    // エピソードの取得
    if (0 < next_offset && next_offset < 670) {
      const to_add_episodes = await searchEpisodesByQuery(
        'SEARCH_EPISODES_NEXT',
        0,
        query,
        next_offset,
        false,
      )

      // 既存のエピソードに追記する
      setEpisodeState((state) => {
        return {
          is_initial: false,
          episodes: [...state.episodes, ...to_add_episodes],
        }
      })
    }
  }

  let results = (
    <>
      <div className='attention-box'>
        <p>&apos;02年〜&apos;09年のアニメ「あたしンち」のエピソードを検索できます。</p>
        <p>&apos;15年、&apos;16年の「新あたしンち」は未対応です…(いつか対応したいです)</p>
      </div>
    </>
  )

  if (!is_initial) {
    // 結果の初期値（NOT FOUND）
    let result_items: ReactNode = (
      <div className='notfound'>
        該当するエピソードは見つかりませんでした…。
        <br />
        検索結果は、エピソード名と部分一致したものを表示します。
      </div>
    )

    // エピソードが一件以上ある
    if (episodes.length > 0) {
      result_items = episodes.map((episode, i) => {
        return <EpisodeCard key={i} {...episode} />
      })
    }

    results = <>{result_items}</>
  }

  return (
    <>
      <div className='wrapper'>
        <div className='content-wrapper'>
          <h2>検索結果</h2>
          {results}
        </div>
      </div>
      <Waypoint onEnter={fetchNextEpisodes} />
    </>
  )
}

export const SearchResult = memo(Content)
