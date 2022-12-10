import { FC, memo } from "react";
import { amzn_links } from "../../define/Links";
import { formatDateJP } from "../../util/Convert";

const Content: FC<ComicInfo> = (props) => {

    const { issue, no } = props;
    const date = new Date(props.date)

    switch (issue) {
        case 0: {
            return (
                <div className="info-line">
                    <div className="comic-info">
                        <div className="thum unpublished">読売新聞<br />日曜版</div>
                        <div className="info">
                            <div className="title">単行本未収録作品</div>
                            <div className="date">{ formatDateJP(date) }掲載</div>
                        </div>
                    </div>
                </div>
            );
        }
        case 99: {
            const c = amzn_links("fanbook");
            return (
                <div className="info-line">
                    <div className="comic-info">
                        <a className="thum" href={ c.thum_link } rel="noreferrer" target="_blank">
                            <img src={ c.img } alt='公式ファンブック' />
                        </a>
                        <img className="amzn-hidden-img" src={ c.img_hidden } alt='公式ファンブック' />
                        <div className="info">
                            <div className="title">公式ファンブック<br />No.{no}</div>
                            <div className="date">{ formatDateJP(date) }掲載</div>
                            <a className="amzn-label" href={ c.text_link } rel="noreferrer" target="_blank">Amazonで購入</a>
                        </div>
                    </div>
                </div>
            );
        }
        default: {
            const c = amzn_links('issue' + issue);
            return (
                <div className="info-line">
                    <div className="comic-info">
                        <a className="thum" href={ c.thum_link } rel="noreferrer" target="_blank">
                            <img src={ c.img } alt='単行本' />
                        </a>
                        <img className="amzn-hidden-img" src={ c.img_hidden } alt='単行本' />
                        <div className="info">
                            <div className="title">{issue}巻 { (no === 0)? "特別編" : "No." + no }</div>
                            <div className="date">{ formatDateJP(date) }発売</div>
                            <a className="amzn-label" href={ c.text_link } rel="noreferrer" target="_blank">Amazonで読む</a>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export const OriginalComic = memo(Content);
