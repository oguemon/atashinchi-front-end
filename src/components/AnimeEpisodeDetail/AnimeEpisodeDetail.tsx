import { FC, memo } from 'react'
import { formatDateJP } from '../../util/Convert'
import { Characters } from './Characters'
import { Note } from './Note'
import { OriginalComicList } from './OriginalComicList'
import { OtherInfo } from './OtherInfo'
import { Outline } from './Outline'
import { PageNavigation } from './PageNavigation'
import { SocialButtonList } from './SocialButtonList'
// import { YouTube } from './YouTube'

type Props = {
  title: string
  url: string
  episode: EpisodeInfo
}

const Content: FC<Props> = ({ title, url, episode }) => {
  if (episode.detail === undefined) {
    return <></>
  }

  return (
    <div className='wrapper'>
      <article className='episode-box'>
        <div className='header'>
          <h1 className='title'>{episode.title}</h1>
          <div className='onair'>
            {formatDateJP(new Date(episode.onair_date))}放送（第
            {episode.onair_no}
            回放送）
          </div>
        </div>
        {/* <YouTube video_id={episode.detail.youtube_id} /> */}
        <SocialButtonList title={title} url={url} />
        <Outline text={episode.outline} />
        <OriginalComicList comics={episode.comic} />
        <Note text={episode.detail.notes} />
        <Characters characters={episode.detail.characters} />
        <OtherInfo episode={episode} />
        <PageNavigation series={episode.series} id={episode.id} />
        <div className='article-footer'>
          第{episode.id}話・{episode.title}
        </div>
      </article>
    </div>
  )
}

export const AnimeEpisodeDetail = memo(Content)
