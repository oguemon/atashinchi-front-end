import Head from 'next/head'
import { FC, memo } from 'react'
import { top_page_url } from '../define/Links'
import ogp_image from '../img/ogp.png'

const Content: FC<OGPInfo> = (props) => {
  // 必須要素取得と任意要素のデフォルト値設定
  const { title, url } = props
  let content_type = 'article'
  let image = top_page_url + ogp_image
  let description = 'アニメあたしンちのエピソードをひたすら紹介します。'

  // type指定があればそれを設定
  if (typeof props.type !== 'undefined') {
    content_type = props.type
  }

  // 画像URL指定があればそれを設定
  if (typeof props.image !== 'undefined') {
    image = props.image
  }

  // 記事説明の指定があればしれを設定
  if (typeof props.description !== 'undefined') {
    description = props.description
  }

  return (
    <Head>
      <meta property='og:title' content={title} />
      <meta property='og:url' content={url} />
      <meta property='og:type' content={content_type} />
      <meta property='og:image' content={image} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content='おぐえもん.com' />
      <meta property='fb:app_id' content='1846956072250071' />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:site' content='@oguemon_com' />
    </Head>
  )
}

export const OGP = memo(Content)
