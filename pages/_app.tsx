// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
// global styles shared across the entire site
import 'styles/global.css'
// this might be better for dark mode
// import 'prismjs/themes/prism-okaidia.css'
// global style overrides for notion
// import 'styles/notion.css'
import 'styles/bronze.css'
// global style overrides for prism theme (optional)
import 'styles/prism-theme.css'

import type { AppProps } from 'next/app'
import * as amplitude from '@amplitude/analytics-browser'
import * as Fathom from 'fathom-client'
import { Geist } from 'next/font/google'
import { useRouter } from 'next/router'
import posthog from 'posthog-js'
import * as React from 'react'

import { bootstrap } from '@/lib/bootstrap-client'
import { cbconsole } from '@/lib/bootstrap-console'
import {
  amplitudeConfig,
  amplitudeId,
  fathomConfig,
  fathomId,
  isServer,
  posthogConfig,
  posthogId
} from '@/lib/config'

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist'
})

if (!isServer) {
  bootstrap()
}
cbconsole()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  React.useEffect(() => {
    function onRouteChangeComplete() {
      if (fathomId) {
        Fathom.trackPageview()
      }

      if (posthogId) {
        posthog.capture('$pageview')
      }
    }

    if (fathomId) {
      Fathom.load(fathomId, fathomConfig)
    }

    if (posthogId) {
      posthog.init(posthogId, posthogConfig)
      // Attach posthog to the window object for global access
      // if (typeof window !== 'undefined') {
      //   window.posthog = posthog
      // }
    }
    // Dynamically update font on route change
    // document.documentElement.style.setProperty('--font-geist', geist.variable)

    if (amplitudeId) {
      amplitude.init(amplitudeId, amplitudeConfig)
      // Attach posthog to the window object for global access
      // if (typeof window !== 'undefined') {
      //   window.amplitude = amplitude
      // }
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  return (
    // https://github.com/vercel/next.js/issues/44840
    // https://nextjs.org/docs/app/getting-started/fonts
    // https://dev.to/sdorra/nextjs-13-fonts-with-tailwind-2l4l
    <>
      {/* <style
        dangerouslySetInnerHTML={{
          __html: `
        :root {
          --font-sans:var(--font-geist);
        }`
        }}
      /> */}
      <div className={`${geist.variable}`}>
        <Component {...pageProps} />
      </div>
    </>
  )
}
