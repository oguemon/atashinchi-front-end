import Link from 'next/link'
import { FC, memo } from 'react'
import { top_page_title, top_page_url } from '../define/Links'
import logo_image from '../img/logo.svg'

const Content: FC = () => {
  // ソーシャルボタンのリンクを作る
  const link_twitter: string =
    'http://twitter.com/share?url=' +
    encodeURIComponent(top_page_url) +
    '&text=' +
    encodeURIComponent(top_page_title) +
    '&related=oguemon_com'

  return (
    <header>
      <div className='wrapper'>
        <Link className='logo-wrapper' href='/'>
          <img className='logo' src={logo_image.src} alt='タチバナ研' />
        </Link>
        <a
          className='twitter'
          href={link_twitter}
          rel='noreferrer'
          target='_blank'
        ></a>
      </div>
    </header>
  )
}

export const Header = memo(Content)
