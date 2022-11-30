import React from "react";
import { top_page_title, top_page_url } from "../define/Links";

import logo_image from "../../img/logo.svg"

const Header: React.FC = () => {

    // ソーシャルボタンのリンクを作る
    const link_twitter: string = "http://twitter.com/share?url=" + encodeURIComponent(top_page_url) + "&text=" + encodeURIComponent(top_page_title) + "&related=oguemon_com";

    return (
        <header>
            <div className="wrapper">
                <a className="logo-wrapper" href="/atashinchi/">
                    <img className="logo" src={ logo_image } alt="タチバナ研" />
                </a>
                <a className="twitter" href={ link_twitter } target="_blank"></a>
            </div>
        </header>
    );
}

export default Header;
