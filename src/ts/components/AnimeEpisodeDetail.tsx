import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import marked from "marked";
import DOMPurify from 'dompurify';
import { characters } from "../define/Characters"
import { top_page_title } from "../define/Links";
import { formatDateJP } from "../util/Convert";
import OGP from "./OGP";
import OriginalComic from "./AnimeEpisodeDetail/OriginalComic";
import OtherInfo from "./AnimeEpisodeDetail/OtherInfo";

import icon_twitter  from "../../img/social-icon-twitter.svg";
import icon_facebook from "../../img/social-icon-facebook.svg";
import icon_line     from "../../img/social-icon-line.svg";

const AnimeEpisodeDetail: React.FC<EpisodeInfo> = (props) => {

    // ページタイトル・URLの作成
    const page_title: string = props.title + "｜#" + props.id + "｜" + top_page_title;
    const page_url: string = location.href;

    // OGP要素を入れる
    const OGP_info: OGPInfo = {
        title: page_title,
        url: page_url,
    };
    if (props.outline !== "") {
        OGP_info.description = props.outline;
    }

    // Youtubeがあれば入れる
    let youtube;
    if (props.detail.youtube_id !== "")
    {
        youtube = <div className="youtube-frame-wrapper">
            <iframe
            className="youtube-frame"
            src={"https://www.youtube.com/embed/" + props.detail.youtube_id }
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
            </iframe>
        </div>;
    }

    // ソーシャルボタンのリンクを作る
    const link_twitter: string = "http://twitter.com/share?text=" + encodeURIComponent(page_title) + "&url=" + encodeURIComponent(page_url) + "&related=oguemon_com";
    const link_facebook: string = "https://www.facebook.com/dialog/feed?app_id=1846956072250071&link=" + encodeURIComponent(page_url);
    const link_line: string = "http://line.me/R/msg/text/?" + encodeURIComponent(page_url);

    // あらすじがあれば入れる
    let outline;
    if (props.outline !== "") {
        outline = (
            <div className="box">
                <h2>あらすじ</h2>
                <div className="outline">{ props.outline }</div>
            </div>
        );
    }

    // 原作情報があれば入れる
    let original_comic;
    if (props.comic.length > 0) {
        // 原作の数だけ回す
        const original_comic_list = [];
        props.comic.forEach((c) => {
            const key_value: string = c.issue + "-" + c.no;
            original_comic_list.push(<OriginalComic key={ key_value } {...c} />);
        });

        // 出力文を作る
        original_comic = (
            <div className="box">
                <h2>原作情報</h2>
                { original_comic_list }
            </div>
        );
    }

    // ノートがあれば入れる
    let notes;
    if (props.detail.notes !== "") {
        // リンクの設定変更
        const renderer = {
            link(href: string, title: string, text: string) {
                const propaty_href: string = `href="${href}"`;
                let propaty_title: string = "";
                let propaty_target: string = "";

                // titleが存在したら代入する
                if (title !== null) {
                    propaty_title = `title="${title}"`;
                }

                // 自分のサイトで無ければtarget="_blank"を加える
                if (href.indexOf("//") > -1 && href.indexOf(document.domain) == -1) {
                    propaty_target = `target="_blank"`;
                }

                return `<a ${propaty_href} ${propaty_title} ${propaty_target}>${text}</a>`;
            }
        };
        marked.use({ renderer });

        notes = (
            <div className="box">
                <h2>Note</h2>
                <div className="note" dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(marked(props.detail.notes), {
                        ALLOWED_ATTR: ['class', 'href', 'target', 'title']
                    })
                }} />
            </div>
        );
    }

    // 登場人物が登録されていたら入れる
    let character;
    if (props.detail.characters.length > 0)
    {
        const character_tags = props.detail.characters.map((character_id) => {
            const character_jp: string = characters[character_id];
            return (<Link className="tag" key={ character_id } to={ "/character/" + character_id }>{ character_jp }</Link>);
        });

        character = (
            <div className="box">
                <h2>主な登場人物</h2>
                <div className="character">
                    { character_tags }
                </div>
            </div>
        );
    }

    // 前後の記事
    let final_eqisode_no: number = 0;
    if (props.series == 1) {
        final_eqisode_no = 669
    }
    let arrow_prev = <></>;
    if (props.id > 1) {
        let prev_id: number = props.id;
        arrow_prev = <Link to={ "/anime/1/" + (--prev_id) } className="arrow-prev">前のエピソード</Link>;
    }
    let arrow_next = <></>;
    if (props.id < final_eqisode_no) {
        let next_id: number = props.id;
        arrow_next = <Link to={ "/anime/1/" + (++next_id) } className="arrow-next">次のエピソード</Link>;
    }
    const arrow_navi = (
        <div className="box">
            <nav className="arrow-navi">
                { arrow_prev }
                { arrow_next }
            </nav>
        </div>
    );

    return (
        <>
            <Helmet>
                <title>{ page_title }</title>
            </Helmet>
            <OGP {...OGP_info} />
            <div className="wrapper">
                <article className="episode-box">
                    <div className="header">
                        <h1 className="title">{ props.title }</h1>
                        <div className="onair">{ formatDateJP(props.onair_date) }放送（第{ (props.onair_no) }回放送）</div>
                    </div>
                    { youtube }
                    {/* ソーシャルボタン */}
                    <div className="social-btn-list">
                        <a className="social-btn" href={ link_twitter } target="_blank">
                            <img src={ icon_twitter } />
                        </a>
                        <a className="social-btn" href={ link_facebook } target="_blank">
                            <img src={ icon_facebook } />
                        </a>
                        <a className="social-btn" href={ link_line } target="_blank">
                            <img src={ icon_line } />
                        </a>
                    </div>
                    {/* あらすじ */}
                    { outline }
                    {/* 原作情報 */}
                    { original_comic }
                    {/* ノート */}
                    { notes }
                    {/* 登場人物 */}
                    { character }
                    {/* その他の情報 */}
                    <OtherInfo {...props}/>
                    {/* 前後の記事のリンク */}
                    { arrow_navi }
                    <div className="article-footer">第{props.id}話・{ props.title }</div>
                </article>
            </div>
        </>
    );
}

export default AnimeEpisodeDetail;
