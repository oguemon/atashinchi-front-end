import { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../util/gTag'

export default function Document() {
  return (
    <Html lang='ja'>
      <Head>
        {/* Favicon */}
        <link rel='shortcut icon' href='/img/favicon/favicon.ico' />
        {/* Google tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
          `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
