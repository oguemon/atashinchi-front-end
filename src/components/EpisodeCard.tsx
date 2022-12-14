import Link from 'next/link'
import { FC, memo } from 'react'
import { formatDateJP } from '../util/Convert'
import { ComicLabel } from './ComicLabel'

const Content: FC<EpisodeInfo> = (props) => {
  // オンエア日の編集
  const onair_date: string = formatDateJP(new Date(props.onair_date))

  // コミックラベル作り
  let comic_labels: JSX.Element[] = props.comic.map((c) => {
    // キーは、巻-作品No-日付
    const key: string =
      c.issue + '-' + c.no + new Date(c.date).toLocaleDateString()

    return <ComicLabel key={key} {...c} />
  })
  // コミックがなければ、アニメオリジナルのラベルを付ける
  if (comic_labels.length == 0) {
    comic_labels = [
      <div key='anime-original' className='comic anime'>
        アニメオリジナル
      </div>,
    ]
  }

  return (
    <div className='episode-card'>
      <Link href={'/anime/' + props.series + '/' + props.id} className='title'>
        {props.title}
      </Link>
      <div className='onair'>{onair_date}放送</div>
      <div className='outline'>{props.outline}</div>
      <div className='detail'>
        {comic_labels}
        <div className='work-id'>#{props.id}</div>
      </div>
    </div>
  )
}

export const EpisodeCard = memo(Content)
