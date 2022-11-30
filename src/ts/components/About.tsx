import React, { useState } from "react";

const About: React.FC = () => {

  return (
    <div className="wrapper">
        <div className="content-wrapper">
            <div className="attention-box">
                <p>あたしンちにハマってる私おぐえもん（<a href="https://twitter.com/oguemon_com" target="_blank">@oguemon_com</a>）が、アニメ版(1期)の各話をひたすら紹介するサイトです。</p>
                <p>紹介文は随時追加していきますが、5/24時点において原作との対応エピソードが一通りわかるようになっています。</p>
                <p>【公式情報】<a href="https://keraeiko.com/" target="_blank">けらえいこ先生HP</a> / <a href="https://twitter.com/atashinchi_new" target="_blank">同Twitter</a> / <a href="https://twitter.com/atashinchimovie" target="_blank">アニメあたしンちTwitter</a></p>
            </div>
        </div>
    </div>
  );
}

export default About;
