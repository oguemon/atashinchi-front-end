import React, { useEffect, useRef, useState } from "react";
import * as EpisodesActions from "../actions/EpisodesActions";
import Autosuggest from 'react-autosuggest';
import * as EpisodeComplement from './EpisodeComplement';
import { fetchEpisodeNames } from '../actions/EpisodeNamesActions';
import EpisodeNamesStore from '../stores/EpisodeNamesStore';

type Prop = {query: string, setquery: Function}

const SearchForm: React.FC<Prop> = (props) => {

    // サジェスト一覧
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // エピソード一覧
    const [episode_names, setEpisodeNames] = useState<string[]>([]);

    // 入力フォームのRef
    const inputQuery = useRef(null);

    useEffect(() => {
        // エピソード名の一覧を要求
        fetchEpisodeNames();

        // 結果を手に入れたら呼び出されるイベント
        EpisodeNamesStore.on("FETCH_ALL_EPISODE_NAMES", () => {
            setEpisodeNames(() => {
                const episodes: EpisodeNameInfo[] = EpisodeNamesStore.getAll();
                const names: string[] = episodes.map((episode) => {
                    return episode.title;
                });

                return names;
            });
        });
    }, []);

    // サジェストを呼び出す時に実行される関数
    // value: {value, reason} 入力された情報
    const onSuggestionsFetchRequested = (value) => {
        // サジェスト結果であるstring[]をsetStateする
        setSuggestions( EpisodeComplement.getSuggestions(episode_names, value) );
    };

    // サジェストをクリアする時に実行される関数
    const onSuggestionsClearRequested = () => {
        setSuggestions( [] );
    };

    // サジェストを選択した時に実行される関数
    const onSuggestionSelected = (e, s) => {
        // サジェスト文で検索する
        sendQuery(s.suggestionValue);
    }

    // オートコンプリメント対象のinput要素
    const inputProps = {
        className: "input-query",
        onChange: (event, { newValue }) => {
            props.setquery(newValue);
        },
        onKeyDown: (e) => {
            // エンターキーが押されると検索する
            if (e.keyCode === 13) {
                // 入力欄に対するフォーカスを外す
                e.target.blur();

                // 設定されているクエリで検索する
                sendQuery(props.query);
            }
        },
        placeholder: "エピソード名を入力",
        ref: inputQuery,
        title: "検索",
        type: "search",
        value: props.query,
    };

    // 検索ボタンがクリックされた時に実行される関数
    const onClickButton = () => {
        // 設定されているクエリで検索する
        sendQuery(props.query);
    }

    // クエリを送信
    function sendQuery (query) {
        // 空文字じゃない時のみ検索
        if (query !== '') {
            props.setquery(query);
            EpisodesActions.searchEpisodesByQuery("SEARCH_EPISODES", 0, query, 0, false);
        }
    };

    return (
        <div className="form-box">
            <div className="wrapper">
                <div className="input-wrapper">
                    {/* iPhoneで「検索」ボタンを出すためのformタグ(submitを防ぐためにreturn falseを加えた) */}
                    <form action="" onSubmit={ () => {return false;} }>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                            onSuggestionSelected={onSuggestionSelected}
                            getSuggestionValue={EpisodeComplement.getSuggestionValue}
                            renderSuggestion={EpisodeComplement.renderSuggestion}
                            focusInputOnSuggestionClick={false}
                            inputProps={inputProps}
                        />
                    </form>
                    <button className="submit-btn" onClick={onClickButton}></button>
                </div>
            </div>
        </div>
    );
}

export default SearchForm;
