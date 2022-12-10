export const GA_TRACKING_ID = String(process.env.NEXT_PUBLIC_GA_ID)

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const sendPageView = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
