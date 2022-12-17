import { FC, memo } from 'react'

type Props = {
  video_id: string
}

const Content: FC<Props> = ({ video_id }) => {
  if (video_id === '') return null

  return (
    <div className='youtube-frame-wrapper'>
      <iframe
        className='youtube-frame'
        src={`https://www.youtube.com/embed/${video_id}`}
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      />
    </div>
  )
}

export const YouTube = memo(Content)
