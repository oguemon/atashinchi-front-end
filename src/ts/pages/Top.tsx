import React from "react";
import { Helmet } from "react-helmet";
import { top_page_title } from "../define/Links";
import OGP from "../components/OGP";
import About from "../components/About";
import AllEpisodes from "../components/AllEpisodes";

const Top: React.FC = () => {

  // ページタイトル・URLの作成
  const page_title: string = top_page_title;
  const page_url: string = location.href;

  // OGP要素を入れる
  const OGP_info: OGPInfo = {
      title: page_title,
      url: page_url,
  };

  return (
    <>
      <Helmet>
          <title>{ page_title }</title>
      </Helmet>
      <OGP {...OGP_info} />
      <About />
      <AllEpisodes />
    </>
  );
}

export default Top;
