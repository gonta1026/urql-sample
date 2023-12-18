import { Client, cacheExchange, fetchExchange } from '@urql/core'
import { devtoolsExchange } from '@urql/devtools'
import fetch from 'cross-fetch'

const newUrqlClient = ({ isServer, url }: { isServer: boolean; url: string }) => {
  return new Client({
    fetch,
    url,
    exchanges: [cacheExchange, devtoolsExchange, fetchExchange],
    requestPolicy: 'network-only',
    fetchOptions: {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      ...(!isServer && { credentials: 'include' }),
    },
  })
}

export const urqlClientForCSR = newUrqlClient({
  isServer: false,
  url: 'https://graphql-pokeapi.graphcdn.app/',
})
export const urqlClientForSSR = newUrqlClient({
  isServer: true,
  url: `https://swapi-graphql.netlify.app/.netlify/functions/index`,
})
