import React from "react"
import { Link } from "react-router-dom";
import { formatDateJP } from "../util/Convert";
import ComicLabel from "./ComicLabel";

const EpisodeCard: React.FC<EpisodeInfo> = (props) => {

    // オンエア日の編集
    const onair_date: string = formatDateJP(props.onair_date);

    // コミックラベル作り
    let comic_labels: JSX.Element[] = props.comic.map((c) => {
        // キーは、巻-作品No-日付
        const key: string = c.issue + "-" + c.no + c.date.toLocaleDateString();

        return (<ComicLabel key={ key } {...c} />);
    });
    // コミックがなければ、アニメオリジナルのラベルを付ける
    if (comic_labels.length == 0) {
        comic_labels = [(
            <div key="anime-original" className="comic anime">
                アニメオリジナル
            </div>
        )];
    }

    return (
    <div className="episode-card">
        <Link to={"/anime/" + props.series + "/" + props.id} className="title">{props.title}</Link>
        <div className="onair">{onair_date}放送</div>
        <div className="outline">{props.outline}</div>
        <div className="detail">
        { comic_labels }
        <div className="work-id">#{ props.id }</div>
        </div>
    </div>
    );
}

export default EpisodeCard;
