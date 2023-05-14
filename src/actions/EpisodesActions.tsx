import { api_host } from '../define/Links'

// リクエストJSONの形式
type EpisodeRequestJSON = {
  type: string
  query_series: number
  query_id: number
  query_word: string
  characters: string[]
  line_offset: number
  want_detail: boolean
  want_note_for_edit: boolean
}

// クエリに応じてストーリーを検索する
export const searchEpisodesByQuery = async (
  query_series: number,
  query_word: string,
  line_offset: number,
  want_detail: boolean,
) => {
  // ストーリーを検索する
  return searchEpisodes({
    type: 'anime',
    query_series,
    query_id: 0,
    query_word,
    characters: [],
    line_offset,
    want_detail,
    want_note_for_edit: false,
  })
}

// idに応じてストーリーを検索する
export const searchEpisodeById = async (
  query_series: number,
  query_id: number,
  want_detail: boolean,
) => {
  // ストーリーを検索する
  return searchEpisodes({
    type: 'anime',
    query_series,
    query_id,
    query_word: '',
    characters: [],
    line_offset: 0,
    want_detail,
    want_note_for_edit: false,
  })
}

// 指定した人物が登場するストーリーを検索する
export const searchEpisodeByCharacters = async (
  characters: string[],
  line_offset: number,
) => {
  // ストーリーを検索する
  return searchEpisodes({
    type: 'anime',
    query_series: 0,
    query_id: 0,
    query_word: '',
    characters,
    line_offset,
    want_detail: false,
    want_note_for_edit: false,
  })
}

// エピソードの全数取得
export const searchAllEpisodes = (line_offset: number) => {
  // ストーリーを検索する
  return searchEpisodes({
    type: 'anime',
    query_series: 0,
    query_id: 0,
    query_word: '',
    characters: [],
    line_offset,
    want_detail: false,
    want_note_for_edit: false,
  })
}

// ストーリーの検索処理
const searchEpisodes = async (request_json: EpisodeRequestJSON) => {
  // APIと非同期通信
  const res = await fetch(api_host + 'index.php', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(request_json),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
  const json = await res.json()

  // 取得結果を配列に格納
  const fetched_episodes: EpisodeInfo[] = json.eqisodes.map((r: any) => {
    const episode: EpisodeInfo = {
      series: r.series,
      id: r.id,
      title: r.title,
      onair_date: r.onair_date,
      onair_no: r.onair_no,
      outline: r.outline,
      video: r.video,
      comic: r.comic,
    }
    // 詳細情報の取得がオンなら取得する
    if (request_json.want_detail) {
      episode['detail'] = {
        notes: r.detail.notes,
        amzn_no: r.detail.amzn_no,
        youtube_id: r.detail.youtube_id,
        characters: r.detail.characters,
        related_episode: r.detail.related_episode,
      }
    }
    return episode
  })

  return fetched_episodes
}
