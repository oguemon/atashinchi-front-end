import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Waypoint } from 'react-waypoint';
import EpisodeCard from "./EpisodeCard";
import * as EpisodesActions from "../actions/EpisodesActions";
import EpisodeListStore from "../stores/EpisodeListStore";

import search_icon from "../../img/search.svg";

const AllEpisodes: React.FC = () => {

    // 取得結果を蓄えるState
    const [episodes, setEpisodes] = useState<EpisodeInfo[]>([]);

    function fetchNextEpisodes () {
        // 次の取得話数
        const next_offset: number = episodes.length;

        // エピソードの取得
        if (next_offset < 670) {
            EpisodesActions.searchAllEpisodes("FETCH_ALL_EPISODES", next_offset);
        }
    }

    // カードのリストを作成する
    const episode_cards = episodes.map((episode) => {
        // キーは、期数-作品No
        const key: string = episode.series + "-" + episode.id;

        return <EpisodeCard key={ key } {...episode} />;
    });

    // Mount時のみ実行される（第二引数に空配列を加えているから）
    useEffect(() => {
        // 結果を手に入れたら呼び出されるイベント
        EpisodeListStore.on("FETCH_ALL_EPISODES", () => {
            // 既存のエピソードに追記する
            setEpisodes((state) => {
                return state.concat(EpisodeListStore.getAll());
            });
        });
    }, []);

    return (
        <div className="wrapper">
            <div className="content-wrapper">
                <h2>エピソード一覧</h2>
                <Link className="search-btn" to="/search"><img src={ search_icon } /><span>エピソード検索</span></Link>
                { episode_cards }
                <Waypoint onEnter={ fetchNextEpisodes } />
            </div>
        </div>
    );
}

export default AllEpisodes;
