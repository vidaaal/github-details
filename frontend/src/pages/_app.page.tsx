import type { AppProps } from 'next/app'

import '@/styles/global.css'
import { DefaultLayout } from '@/layouts/DefaultLayout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  )
}
