import Head from 'next/head'
import { FC, memo } from 'react'
import ogp_image from '../img/ogp.png'
import { getFullURL } from '../util/getFullURL'

type Props = {
  title: string
  description: string
  ogp: OGPInfo
}

const Content: FC<Props> = ({ title, description, ogp }) => {
  const url = ogp.url
  const content_type = ogp.type ?? 'article'
  const image = ogp.image ?? getFullURL(ogp_image.src)

  return (
    <Head>
      <meta charSet='UTF-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <title>{title}</title>
      <meta name='description' content={description} />

      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={url} />
      <meta property='og:type' content={content_type} />
      <meta property='og:image' content={image} />
      <meta property='og:site_name' content='おぐえもん.com' />
      <meta property='fb:app_id' content='1846956072250071' />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:site' content='@oguemon_com' />
    </Head>
  )
}

export const HeadElements = memo(Content)
