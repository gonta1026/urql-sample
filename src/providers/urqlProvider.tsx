import { Provider } from 'urql'
import { urqlClientForCSR } from '@/lib'

export const URQLProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider value={urqlClientForCSR}>{children}</Provider>
}
