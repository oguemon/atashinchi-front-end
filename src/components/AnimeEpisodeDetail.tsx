import DOMPurify from 'dompurify';
import { marked, Renderer } from "marked";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import { FC, memo } from "react";
import { characters } from "../define/Characters"
import { top_page_title, top_page_url } from "../define/Links";
import icon_facebook from "../img/social-icon-facebook.svg";
import icon_line     from "../img/social-icon-line.svg";
import icon_twitter  from "../img/social-icon-twitter.svg";
import { formatDateJP } from "../util/Convert";
import { OriginalComic } from "./AnimeEpisodeDetail/OriginalComic";
import { OtherInfo } from "./AnimeEpisodeDetail/OtherInfo";
import { OGP } from "./OGP";

type Props = {
    episode: EpisodeInfo
}

const Content: FC<Props> = ({episode: props}) => {
    const router = useRouter();

    // ページタイトル・URLの作成
    const page_title: string = props.title + "｜#" + props.id + "｜" + top_page_title;
    const page_url: string = router.pathname;

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
    if (props.detail!.youtube_id !== '')
    {
        youtube = <div className="youtube-frame-wrapper">
            <iframe
            className="youtube-frame"
            src={"https://www.youtube.com/embed/" + props.detail!.youtube_id }
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
        // 出力文を作る
        original_comic = (
            <div className="box">
                <h2>原作情報</h2>
                {
                    // 原作の数だけ回す
                    props.comic.map((c) => {
                        const key_value: string = c.issue + "-" + c.no;
                        return <OriginalComic key={ key_value } {...c} />;
                    })
                }
            </div>
        );
    }

    // ノートがあれば入れる
    let notes;
    if (props.detail!.notes !== "") {
        // リンクの設定変更
        const renderer = new Renderer()
        renderer.link = (href: string, title: string, text: string) => {
            const propaty_href = `href="${href}"`;
            let propaty_title = "";
            let propaty_target = "";

            // titleが存在したら代入する
            if (title !== null) {
                propaty_title = `title="${title}"`;
            }

            // 自分のサイトで無ければtarget="_blank"を加える
            if (href.indexOf("//") > -1 && href.indexOf(top_page_url) == -1) {
                propaty_target = `target="_blank"`;
            }

            return `<a ${propaty_href} ${propaty_title} ${propaty_target}>${text}</a>`;
        }

        const html = marked(props.detail!.notes, { renderer })
        
        // なぜかサニタイズできないので一旦諦め
        const sanitized_html = html
        // const sanitized_html = DOMPurify.sanitize(html, {
        //     ALLOWED_ATTR: ['class', 'href', 'target', 'title']
        // })

        notes = (
            <div className="box">
                <h2>Note</h2>
                <div className="note" dangerouslySetInnerHTML={{
                    __html: sanitized_html
                }} />
            </div>
        );
    }

    // 登場人物が登録されていたら入れる
    let character;
    if (props.detail!.characters.length > 0)
    {
        const character_tags = props.detail!.characters.map((character_id) => {
            const character_jp: string = characters[character_id];
            return (<Link className="tag" key={ character_id } href={ "/character/" + character_id }>{ character_jp }</Link>);
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
    let final_eqisode_no = 0;
    if (props.series == 1) {
        final_eqisode_no = 669
    }
    let arrow_prev = <></>;
    if (props.id > 1) {
        let prev_id: number = props.id;
        arrow_prev = <Link href={ "/anime/1/" + (--prev_id) } className="arrow-prev">前のエピソード</Link>;
    }
    let arrow_next = <></>;
    if (props.id < final_eqisode_no) {
        let next_id: number = props.id;
        arrow_next = <Link href={ "/anime/1/" + (++next_id) } className="arrow-next">次のエピソード</Link>;
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
            <Head>
                <title>{ page_title }</title>
            </Head>
            <OGP {...OGP_info} />
            <div className="wrapper">
                <article className="episode-box">
                    <div className="header">
                        <h1 className="title">{ props.title }</h1>
                        <div className="onair">{ formatDateJP(new Date(props.onair_date)) }放送（第{ (props.onair_no) }回放送）</div>
                    </div>
                    { youtube }
                    {/* ソーシャルボタン */}
                    <div className="social-btn-list">
                        <a className="social-btn" href={ link_twitter } rel="noreferrer" target="_blank">
                            <img src={ icon_twitter.src } alt='Twitter Icon' />
                        </a>
                        <a className="social-btn" href={ link_facebook } rel="noreferrer" target="_blank">
                            <img src={ icon_facebook.src } alt='Facebook Icon' />
                        </a>
                        <a className="social-btn" href={ link_line } rel="noreferrer" target="_blank">
                            <img src={ icon_line.src } alt='Line Icon' />
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
                    <OtherInfo episode={props}/>
                    {/* 前後の記事のリンク */}
                    { arrow_navi }
                    <div className="article-footer">第{props.id}話・{ props.title }</div>
                </article>
            </div>
        </>
    );
}

export const AnimeEpisodeDetail = memo(Content);
