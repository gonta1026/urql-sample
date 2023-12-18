import { gql } from 'urql'
import { urqlClientForSSR } from '@/lib'

const queryDocument = gql`
  {
    allFilms {
      films {
        title
      }
    }
  }
`

export const getAllFilms = async () => {
  const result = await urqlClientForSSR.query(queryDocument, { requestPolicy: 'network-only' })
  return result
}
