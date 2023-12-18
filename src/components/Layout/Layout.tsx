import React, { ReactNode } from 'react'
import { gql, useQuery } from 'urql'

const PokemonsQuery = gql`
  query {
    pokemons(limit: 10) {
      results {
        id
        name
      }
    }
  }
`

export const Layout = ({ children }: { children: ReactNode }) => {
  const [{ fetching, data, error }] = useQuery({
    requestPolicy: 'network-only',
    query: PokemonsQuery,
    // variables:
  })

  return <div>{children}</div>
}
