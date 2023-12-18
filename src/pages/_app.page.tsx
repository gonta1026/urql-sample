import { AppProps } from 'next/app'
import React from 'react'
import { URQLProvider } from '@/providers/urqlProvider'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <URQLProvider>
      <Component {...pageProps} />
    </URQLProvider>
  )
}
