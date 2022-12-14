import { FC, memo } from "react";

const Content: FC = () => {
  return (
    <footer>
      <div className="wrapper">
        <div className="copyright-attention">
          <p>当サイトは、「あたしンち」の原作者であるけらえいこ先生、およびテレビアニメを制作しているシンエイ動画(株)等とは無関係に運営している非公式サイトです。</p>
          <p>当サイトの利用規則は「<a href="https://oguemon.com/terms/">おぐえもん.com</a>」に準じます。</p>
        </div>
        <div className="oguemon-link">
          <a href="https://oguemon.com/">おぐえもん.com</a>・<a href="https://forms.gle/SDnHnzGLH5Y4ynzz6" rel="noreferrer" target="_blank">お問い合わせ</a>
        </div>
        <div className="copyright">
          Copyright © 2020 - 2022 おぐえもん
        </div>
      </div>
    </footer>
  );
}

export const Footer = memo(Content);
