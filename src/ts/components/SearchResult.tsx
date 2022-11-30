import React, { useState, useEffect } from "react"
import { Waypoint } from 'react-waypoint';
import EpisodeCard from "./EpisodeCard"
import * as EpisodesActions from "../actions/EpisodesActions";
import EpisodeListStore from "../stores/EpisodeListStore"

type Prop = {query: string}

const SearchResult: React.FC<Prop> = (props) => {

    // 検索結果の一覧を蓄えるState
    const [episode_state, setEpisodeState] = useState<any>({
        is_initial: true,
        episodes: []
    });

    const { is_initial, episodes } = episode_state;

    function fetchNextEpisodes () {
        // 次の取得話数
        const next_offset: number = episodes.length;

        // エピソードの取得
        if (0 < next_offset && next_offset < 670) {
            EpisodesActions.searchEpisodesByQuery("SEARCH_EPISODES_NEXT", 0, props.query, next_offset, false);
        }
    }

    let results = <>
        <div className="attention-box">
            <p>'02年〜'09年のアニメ「あたしンち」のエピソードを検索できます。</p>
            <p>'15年、'16年の「新あたしンち」は未対応です…(いつか対応したいです)</p>
        </div>
    </>;

    if (!is_initial) {
        // 結果の初期値（NOT FOUND）
        let result_items = (
            <div className="notfound">
                該当するエピソードは見つかりませんでした…。<br />
                検索結果は、エピソード名と部分一致したものを表示します。
            </div>
        );

        // エピソードが一件以上ある
        if (episodes.length > 0) {
            result_items = episodes.map((episode, i) => {
                return <EpisodeCard key={ i } {...episode} />;
            });
        }

        results = (
            <>
                { result_items }
            </>
        );
    }

    // Mount時のみ実行される（第二引数に空配列を加えているから）
    useEffect(() => {
        // 結果を手に入れたら呼び出されるイベント
        EpisodeListStore.on("SEARCH_EPISODES", () => {
            console.log("最初");
            // エピソードを設定する
            setEpisodeState((state) => {
                return {
                    is_initial: false,
                    episodes: EpisodeListStore.getAll()
                };
            });
        });

        // 結果を手に入れたら呼び出されるイベント
        EpisodeListStore.on("SEARCH_EPISODES_NEXT", () => {
            console.log("続き");
            // 既存のエピソードに追記する
            setEpisodeState((state) => {
                return {
                    is_initial: false,
                    episodes: state.episodes.concat(EpisodeListStore.getAll())
                };
            });
        });
    }, []);

    return (
        <>
            <div className="wrapper">
                <div className="content-wrapper">
                    <h2>検索結果</h2>
                    { results }
                </div>
            </div>
            <Waypoint onEnter={ fetchNextEpisodes } />
        </>
    );
}

export default SearchResult;
