import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { top_page_title } from "../define/Links";
import OGP from "../components/OGP";
import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResult";

const Top: React.FC = () => {

    // ページタイトル・URLの作成
    const page_title: string = "エピソード検索｜" + top_page_title;
    const page_url: string = location.href;

    // OGP要素を入れる
    const OGP_info: OGPInfo = {
        title: page_title,
        url: page_url,
    };

    // クエリの格納
    const [query, setQuery] = useState<string>("");

    return (
        <>
            <Helmet>
                <title>{ page_title }</title>
            </Helmet>
            <OGP {...OGP_info} />
            <SearchForm query={query} setquery={setQuery} />
            <SearchResult query={ query } />
        </>
    );
}

export default Top;
