import React from "react";
import { Helmet } from "react-helmet";
import ogp_image from "../../img/ogp.png"

const OGP: React.FC<OGPInfo> = (props) => {

    // 必須要素取得と任意要素のデフォルト値設定
    const { title, url } = props;
    let content_type: string = "article";
    let image: string = "https://" + window.location.host + ogp_image;
    let description: string = "アニメあたしンちのエピソードをひたすら紹介します。";

    // type指定があればそれを設定
    if (typeof props.type !== "undefined") {
        content_type = props.type;
    }

    // 画像URL指定があればそれを設定
    if (typeof props.image !== "undefined") {
        image = props.image;
    }

    // 記事説明の指定があればしれを設定
    if (typeof props.description !== "undefined") {
        description = props.description;
    }

    return (
        <Helmet>
            <meta property="og:title" content={ title } />
            <meta property="og:url" content={ url } />
            <meta property="og:type" content={ content_type } />
            <meta property="og:image" content={ image } />
            <meta property="og:description" content={ description } />
            <meta property="og:site_name" content="おぐえもん.com" />
            <meta property="fb:app_id" content="1846956072250071" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@oguemon_com" />
        </Helmet>
    )
}

export default OGP;
