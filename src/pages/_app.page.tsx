import { GraphQLClient, ClientContext } from 'graphql-hooks'
import { AppProps } from 'next/app'
import React from 'react'
import { URQLProvider } from '@/providers/urqlProvider'

const client = new GraphQLClient({
  url: 'https://graphql-pokeapi.graphcdn.app/',
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <URQLProvider>
      <ClientContext.Provider value={client}>
        <Component {...pageProps} />
      </ClientContext.Provider>
    </URQLProvider>
  )
}
