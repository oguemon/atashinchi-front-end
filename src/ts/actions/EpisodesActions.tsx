import dispatcher from "../dispatcher";
import { top_page_url } from "../define/Links";
import { DispatchTypeNames } from "../define/Enums";

// リクエストJSONの形式
type EpisodeRequestJSON = {
    type: string,
    query_series: number,
    query_id: number,
    query_word: string,
    characters: string[],
    line_offset: number,
    want_detail: boolean,
    want_note_for_edit: boolean,
};

// idに応じてストーリーを検索する
export function searchEpisodeById (
    dispatch_type: DispatchTypeNames,
    query_series: number,
    query_id: number,
    want_detail: boolean
) {
    // ストーリーを検索する
    searchEpisodes({
        type: "anime",
        query_series,
        query_id,
        query_word: "",
        characters: [],
        line_offset: 0,
        want_detail,
        want_note_for_edit: false,
    }, dispatch_type);
}

// クエリに応じてストーリーを検索する
export function searchEpisodesByQuery (
    dispatch_type: DispatchTypeNames,
    query_series: number,
    query_word: string,
    line_offset: number,
    want_detail: boolean
) {
    // ストーリーを検索する
    searchEpisodes({
        type: "anime",
        query_series,
        query_id: 0,
        query_word,
        characters: [],
        line_offset,
        want_detail,
        want_note_for_edit: false,
    }, dispatch_type);
}

// 指定した人物が登場するストーリーを検索する
export function searchEpisodeByCharacters (
    dispatch_type: DispatchTypeNames,
    characters: string[],
    line_offset: number
) {
    // ストーリーを検索する
    searchEpisodes({
        type: "anime",
        query_series: 0,
        query_id: 0,
        query_word: "",
        characters,
        line_offset,
        want_detail: false,
        want_note_for_edit: false,
    }, dispatch_type);
}

// エピソードの全数取得
export function searchAllEpisodes (
    dispatch_type: DispatchTypeNames,
    line_offset: number
) {
    // ストーリーを検索する
    searchEpisodes({
        type: "anime",
        query_series: 0,
        query_id: 0,
        query_word: "",
        characters: [],
        line_offset,
        want_detail: false,
        want_note_for_edit: false,
    }, dispatch_type);
}

// ストーリーの検索処理
function searchEpisodes(request_json: EpisodeRequestJSON, dispatch_type: DispatchTypeNames) {
    // APIと非同期通信
    fetch(top_page_url + "api/index.php", {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify(request_json),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    })
    .then((res) => res.json())
    .then((result) => {
        // 取得結果を配列に格納
        const fetched_episodes: EpisodeInfo[] = result.eqisodes.map((r) => {
            const episode: EpisodeInfo = {
                series: r.series,
                id: r.id,
                title: r.title,
                onair_date: new Date(r.onair_date),
                onair_no: r.onair_no,
                outline: r.outline,
                video: r.video,
                comic: r.comic.map((c) => {
                    return {
                        issue: c.issue,
                        no: c.no,
                        date: new Date(c.date),
                    }
                })
            };
            // 詳細情報の取得がオンなら取得する
            if (request_json.want_detail) {
                episode['detail'] = {
                    notes: r.detail.notes,
                    amzn_no: r.detail.amzn_no,
                    youtube_id: r.detail.youtube_id,
                    characters: r.detail.characters,
                    related_episode: r.detail.related_episode,
                };
            }
            return episode;
        });

        dispatcher.dispatch({
            type: dispatch_type,
            episodes: fetched_episodes,
        });
    });
}
