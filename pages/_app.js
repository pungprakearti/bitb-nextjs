import Head from 'next/head'
import Script from 'next/script'
import 'styles/global.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        strategy='afterInteractive'
        src='https://www.googletagmanager.com/gtag/js?id=G-2R96VVPY0P'
      />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-2R96VVPY0P', {
          page_path: window.location.pathname,
          });
          `,
        }}
      />
      <Head>
        <title>Andrew Pungprakearti - Front End Software Engineer</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
