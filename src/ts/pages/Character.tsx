import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Helmet } from "react-helmet";
import OGP from "../components/OGP";
import { Waypoint } from 'react-waypoint';
import { top_page_title } from "../define/Links";
import { characters, character_profiles } from "../define/Characters";
import EpisodeCard from "../components/EpisodeCard"
import * as EpisodesActions from "../actions/EpisodesActions";
import EpisodeListStore from "../stores/EpisodeListStore";

type Prop = RouteComponentProps<{character_id: string}>

const Character: React.FC<Prop> = (props) => {

    // キャラクターid
    const [character, setCharacterId] = useState({
        id: "",
        name: "",
    });

    // 取得結果を蓄えるState
    const [episodes, setEpisodes] = useState<EpisodeInfo[]>([]);

    function fetchNextEpisodes () {
        // 次の取得話数
        const next_offset: number = episodes.length;

        // エピソードの取得
        if (0 < next_offset && next_offset < 670) {
            EpisodesActions.searchEpisodeByCharacters("SEARCH_EPISODES", [character.id], next_offset);
        }
    }

    // Mount時のみ実行される（第二引数に空配列を加えているから）
    useEffect(() => {
        // 結果を手に入れたら呼び出されるイベント
        EpisodeListStore.on("SEARCH_EPISODES", () => {
            // 既存のエピソードに追記する
            setEpisodes((state) => {
                return state.concat(EpisodeListStore.getAll());
            });
        });
    }, []);

    useEffect(() => {
        // 結果を手に入れたら呼び出されるイベント
        if (character.id != props.match.params.character_id) {
            // 状態保存
            setCharacterId({
                id: props.match.params.character_id,
                name: characters[props.match.params.character_id],
            });

            // 検索の実行
            EpisodesActions.searchEpisodeByCharacters("SEARCH_EPISODES", [props.match.params.character_id], 0);
        }
    });

    const result_items = episodes.map((episode, i) => {
        return <EpisodeCard key={ i } {...episode} />;
    });

    // ページタイトル・URLの作成
    const page_title: string = character.name + "｜" + top_page_title;
    const page_url: string = location.href;

    // OGP要素を入れる
    const OGP_info: OGPInfo = {
        title: page_title,
        url: page_url,
    };

    return (
        <>
            <Helmet>
                <title>{ page_title }</title>
            </Helmet>
            <OGP {...OGP_info} />
            <div className="character-profile">
                <div className="wrapper">
                    <div className="content-wrapper">
                        <h1>{ character.name }</h1>
                        <div className="description">{ character_profiles[character.id] }</div>
                    </div>
                </div>
            </div>
            <div className="wrapper">
                <div className="content-wrapper">
                    <h2>{ character.name }が登場する話</h2>
                    (現在は200話まで対応)
                    { result_items }
                </div>
            </div>
            <Waypoint onEnter={ fetchNextEpisodes } />
        </>
    );
}

export default Character;
