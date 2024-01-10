import { useQuery } from 'graphql-hooks'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React from 'react'
import { Layout } from '@/components/Layout/Layout'
import { getAllFilms } from '@/features/film/api/getAllFilms'

type Film = { title: string; __typename: 'Film' }

type ServerSideProps = {
  films: Film[]
}

const PokemonsQuery = `
  query {
    pokemons(limit: 10) {
      results {
        id
        name
      }
    }
  }
`

export default function TopPage({ films }: ServerSideProps) {
  const { data } = useQuery(PokemonsQuery)
  console.log(data)

  return (
    <Layout>
      <div style={{ width: '200px', margin: '20px auto' }}>
        <div>
          <Link href={'/a'}>to A</Link>
        </div>
        <div>
          <Link href={'/b'}>to B</Link>
        </div>
        <div>
          <Link href={'/'}>to Home</Link>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async () => {
  const { data } = await getAllFilms()
  const films = data.allFilms.films
  return {
    props: {
      films,
    },
  }
}
