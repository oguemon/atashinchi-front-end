import { api_host } from '../define/Links'

// episode_name.phpから返るJSON
type EpisodeNameResponseJSON = {
  res_code: number
  type: 'anime'
  eqisodes: [
    {
      series: string
      id: string
      title: string
    },
  ]
}

// ストーリーの検索処理
export const fetchEpisodeNames = async () => {
  // APIと非同期通信
  const res = await fetch(api_host + 'episode_name.php', {
    method: 'POST',
    body: JSON.stringify({ type: 'anime' }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
  const json = (await res.json()) as EpisodeNameResponseJSON

  // 取得結果を配列に格納
  const fetched_episodes: EpisodeNameInfo[] = json.eqisodes.map((r) => {
    const episode: EpisodeNameInfo = {
      series: Number.parseInt(r.series, 10),
      id: Number.parseInt(r.id, 10),
      title: r.title,
    }
    return episode
  })

  return fetched_episodes
}
