import dispatcher from "../dispatcher";
import { top_page_url } from "../define/Links";

// ストーリーの検索処理
export function fetchEpisodeNames() {
    // APIと非同期通信
    fetch(top_page_url + "api/episode_name.php", {
        method: "POST",
        body: JSON.stringify({type: "anime"}),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    })
    .then((res) => res.json())
    .then((result) => {
        // 取得結果を配列に格納
        const fetched_episodes: EpisodeNameInfo[] = result.eqisodes.map((r) => {
            const episode: EpisodeNameInfo = {
                series: r.series,
                id: r.id,
                title: r.title,
            };
            return episode;
        });

        dispatcher.dispatch({
            type: "FETCH_ALL_EPISODE_NAMES",
            episodes: fetched_episodes,
        });
    });
}
