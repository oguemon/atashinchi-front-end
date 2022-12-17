import { FC, memo } from 'react'
import { Layout } from './Layout'

type Props = {
  episode: EpisodeInfo
}

const Content: FC<Props> = ({ episode }) => {
  // Amazon Primeの話数とリンクを求める
  const amzn_no = episode.detail!.amzn_no
  const amzn_url = 'https://www.amazon.co.jp/gp/video/detail/B00FZE8QOS/'

  const amzn_eqisode = amzn_no == 0 ? '未配信' : `第${amzn_no}話`
  const amzn_btn =
    amzn_no == 0 ? (
      <></>
    ) : (
      <a
        className='ondemand-link'
        href={amzn_url}
        rel='noreferrer'
        target='_blank'
      >
        視聴する
      </a>
    )

  // Abema TVの話数とリンクを求める
  let abema_no = episode.detail!.amzn_no
  let abema_url = 'https://abema.tv/video/episode/35-34_s1_p' + String(abema_no)

  if (episode.detail!.amzn_no <= 198) {
    // 198話以前は3エピソードで1話となり、URLも異なる
    abema_no = Math.ceil(episode.detail!.amzn_no / 3)
    abema_url =
      'https://abema.tv/video/episode/35-9ktacxeimpu_s0_p' + String(abema_no)
  }

  const abema_eqisode = abema_no == 0 ? '未配信' : `第${abema_no}話`
  const abema_btn =
    abema_no == 0 ? (
      <></>
    ) : (
      <a
        className='ondemand-link'
        href={abema_url}
        rel='noreferrer'
        target='_blank'
      >
        視聴する
      </a>
    )

  return (
    <Layout>
      <h2>その他情報</h2>
      <table className='other-info'>
        <tbody>
          <tr>
            <th>作品通番</th>
            <td colSpan={2}>第{episode.id}話</td>
          </tr>
          <tr>
            <th>
              Prime Video
              <br />
              <span className='mini-note'>※Prime会員のみ</span>
            </th>
            <td>{amzn_eqisode}</td>
            <td className='button-cell'>{amzn_btn}</td>
          </tr>
          <tr>
            <th>
              Abema TV
              <br />
              <span className='mini-note'>※一部無料</span>
            </th>
            <td>{abema_eqisode}</td>
            <td className='button-cell'>{abema_btn}</td>
          </tr>
          <tr>
            <th>ビデオ</th>
            <td colSpan={2}>
              第{episode.video.collection}集・Vol.{episode.video.volume}
            </td>
          </tr>
        </tbody>
      </table>
    </Layout>
  )
}

export const OtherInfo = memo(Content)
