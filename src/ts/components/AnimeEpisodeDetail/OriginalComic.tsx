import React from "react";
import { formatDateJP } from "../../util/Convert";
import { amzn_links } from "../../define/Links";

const OriginalComic: React.FC<ComicInfo> = (props) => {

    const { issue, no, date } = props;

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
                        <a className="thum" href={ c.thum_link } target="_blank">
                            <img src={ c.img } />
                        </a>
                        <img className="amzn-hidden-img" src={ c.img_hidden } />
                        <div className="info">
                            <div className="title">公式ファンブック<br />No.{no}</div>
                            <div className="date">{ formatDateJP(date) }掲載</div>
                            <a className="amzn-label" href={ c.text_link } target="_blank">Amazonで購入</a>
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
                        <a className="thum" href={ c.thum_link } target="_blank">
                            <img src={ c.img } />
                        </a>
                        <img className="amzn-hidden-img" src={ c.img_hidden } />
                        <div className="info">
                            <div className="title">{issue}巻 { (no === 0)? "特別編" : "No." + no }</div>
                            <div className="date">{ formatDateJP(date) }発売</div>
                            <a className="amzn-label" href={ c.text_link } target="_blank">Amazonで読む</a>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default OriginalComic;
