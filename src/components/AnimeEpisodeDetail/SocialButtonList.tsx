import { FC, memo } from 'react'
import icon_facebook from '../../img/social-icon-facebook.svg'
import icon_line from '../../img/social-icon-line.svg'
import icon_twitter from '../../img/social-icon-twitter.svg'

type Props = {
  title: string
  url: string
}

const Content: FC<Props> = ({ title, url }) => {
  const encoded_title = encodeURIComponent(title)
  const encoded_url = encodeURIComponent(url)

  // ソーシャルボタンのリンクを作る
  const link_twitter = `http://twitter.com/share?text=${encoded_title}&url=${encoded_url}&related=oguemon_com`
  const link_facebook = `https://www.facebook.com/dialog/feed?app_id=1846956072250071&link=${encoded_url}`
  const link_line = `http://line.me/R/msg/text/?${encoded_url}`

  return (
    <div className='social-btn-list'>
      <a
        className='social-btn'
        href={link_twitter}
        rel='noreferrer'
        target='_blank'
      >
        <img src={icon_twitter.src} alt='Twitter Icon' />
      </a>
      <a
        className='social-btn'
        href={link_facebook}
        rel='noreferrer'
        target='_blank'
      >
        <img src={icon_facebook.src} alt='Facebook Icon' />
      </a>
      <a
        className='social-btn'
        href={link_line}
        rel='noreferrer'
        target='_blank'
      >
        <img src={icon_line.src} alt='Line Icon' />
      </a>
    </div>
  )
}

export const SocialButtonList = memo(Content)
