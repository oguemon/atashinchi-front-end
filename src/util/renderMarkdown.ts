import DOMPurify from 'isomorphic-dompurify'
import { marked, Renderer } from 'marked'
import { gfmHeadingId } from 'marked-gfm-heading-id'
import { mangle } from 'marked-mangle'
import { top_page_url } from '../define/Links'

// リンクの設定変更
const renderer = new Renderer()
renderer.link = (href: string, title: string, text: string) => {
  const property_title = title ? `title="${title}"` : ''
  const property_target =
    href.indexOf('//') > -1 && href.indexOf(top_page_url) == -1
      ? `rel="noreferrer" target="_blank"`
      : ''

  return `<a href="${href}" ${property_title} ${property_target}>${text}</a>`
}

export const renderMarkdown = (md: string) => {
  marked.use(gfmHeadingId())
  marked.use(mangle())
  const html = marked(md, { renderer })
  const sanitized_html = DOMPurify.sanitize(html, {
    ALLOWED_ATTR: ['class', 'href', 'target', 'title'],
  })

  return sanitized_html
}
