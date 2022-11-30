import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import * as EpisodesActions from "../actions/EpisodesActions";
import EpisodeListStore from "../stores/EpisodeListStore";
import AnimeEpisodeDetail from "../components/AnimeEpisodeDetail";

type Prop = RouteComponentProps<{episode_id: string}>

const AnimeEpisode: React.FC<Prop> = (props) => {

    // エピソード（1/100の形式：1期の100話）
    const [episode_id, setEpisodeId] = useState("");

    // 検索結果の一覧を蓄えるState
    const [episode_info, setEpisodeState] = useState(null);

    useEffect(() => {
        // 結果を手に入れたら呼び出されるイベント
        if (episode_id != props.match.params.episode_id) {
            // 状態保存
            setEpisodeId(props.match.params.episode_id);

            // ハイフンで区切る（2個）
            const splited_val: string[] = props.match.params.episode_id.split('/', 2);
            const q = {
                series: Number(splited_val[0]),
                id: Number(splited_val[1]),
            };

            // 検索の実行
            EpisodesActions.searchEpisodeById("SEARCH_EPISODES", q.series, q.id, true);
        }

        // 結果を手に入れたら呼び出されるイベント
        EpisodeListStore.on("SEARCH_EPISODES", () => {
            // エピソードに追加
            setEpisodeState(EpisodeListStore.getOne());
        });
    });

    // 結果に応じた出力変更
    let output;
    if (episode_info !== null) {
        output = <AnimeEpisodeDetail {...episode_info} />;
    } else {
        output = <></>;
    }

    return (
        <>{ output }</>
    );
}

export default AnimeEpisode;
