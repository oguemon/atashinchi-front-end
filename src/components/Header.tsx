import Link from 'next/link'
import { FC, memo } from 'react'
import { top_page_title, top_page_url } from '../define/Links'
import logo_image from '../img/logo.svg'

const Content: FC = () => {
  // ソーシャルボタンのリンクを作る
  const encoded_title = encodeURIComponent(top_page_title)
  const encoded_url = encodeURIComponent(top_page_url)
  const link_twitter = `http://twitter.com/share?text=${encoded_title}&url=${encoded_url}&related=oguemon_com`

  return (
    <header>
      <div className='wrapper'>
        <Link className='logo-wrapper' href='/'>
          <img className='logo' src={logo_image.src} alt='タチバナ研' />
        </Link>
        <a
          className='twitter'
          href={link_twitter}
          title='Twitterでサイトを共有'
          rel='noreferrer'
          target='_blank'
        ></a>
      </div>
    </header>
  )
}

export const Header = memo(Content)
