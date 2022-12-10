import { top_page_url } from '../define/Links'

export const getFullURL = (path: string) => {
  if (path.charAt(0) === '/') {
    return top_page_url + path.substring(1)
  }

  return top_page_url + path
}
