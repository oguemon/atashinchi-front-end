import { api_host } from '../define/Links'

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
  const json = await res.json()

  // 取得結果を配列に格納
  const fetched_episodes: EpisodeNameInfo[] = json.eqisodes.map((r: any) => {
    const episode: EpisodeNameInfo = {
      series: r.series,
      id: r.id,
      title: r.title,
    }
    return episode
  })

  return fetched_episodes
}
