import React from "react"

// 半角英数字を全角英数字に変換
function hankaku2Zenkaku(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９！？]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}

// 入力された文字列に対するサジェスト文字列を導出する
// ({value, reason}) => string[]
export function getSuggestions(episode_names: string[], input_data): string[] {
    // 前後の空白を削除
    const trimed_query: string = input_data.value.trim();

    // 半角全角変換（と波線、読点変換）でクエリを正規化
    const nomalized_query: string = hankaku2Zenkaku(trimed_query)
                                    .replace(/[～]/g,"〜")
                                    .replace(/[,]/g,"、");

    // 空文字ならばノーヒットでフィニッシュ
    if (nomalized_query === '') {
        return [];
    }

    // 絞った結果できた配列を返す
    const filtered_name_list: string[] = episode_names.filter((name) => {
        // エピソード名を正規化
        const nomalized_name: string = hankaku2Zenkaku(name);

        // ヒットする位置を確かめられたらtrue
        return (nomalized_name.indexOf(nomalized_query) >= 0);
    });

    // エピソード名の短い順にソート
    filtered_name_list.sort((a, b) => {
        return a.length - b.length;
    });

    // 最大10クエリに抑える
    const sliced_name_list: string[] = filtered_name_list.slice(0,10);

    return sliced_name_list;
}

// サジェストの選択時にinputへ設定する文字列
export const getSuggestionValue = (suggestion: string) => {
    return suggestion;
};

// 各サジェストの表示時に設定するReact-DOM
export const renderSuggestion = (suggestion: string) => {
    return (
        <span>{suggestion}</span>
    );
};
