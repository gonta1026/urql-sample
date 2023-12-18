import { waitFor, screen } from '@testing-library/react'
import { Site } from '@/__generated__/gql'
import { mockGetSiteQuery, mockSite, mockSiteBanner } from '@/__generated__/mockHandlers'
import { server } from '@/mocks/server'
import Top, { getServerSideProps } from '@/pages/index.page'
import { generateSiteColors } from '@/store/theme'
import { renderWithProviders } from '@/utils/test'
import '@testing-library/jest-dom'

const mainColor = '#333'
const mockServer = server([
  mockGetSiteQuery((req, res, ctx) => {
    const { url } = req.variables

    return res(
      ctx.data({
        site: mockSite({
          title: '飲食店A',
          primaryColor: mainColor,
          url: url,
          siteBanners: [
            mockSiteBanner({
              imageURL: 'https://via.placeholder.com/600/d32776',
            }),
            mockSiteBanner({
              imageURL: 'https://via.placeholder.com/600/d32776',
            }),
          ],
        }),
      }),
    )
  }),
])

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

beforeEach(async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const result = await getServerSideProps({ req: { headers: { host: 'localhost' } } })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const pageProps = result.props
  renderWithProviders(
    <Top
      site={
        {
          title: 'test',
          description: 'test',
        } as Site
      }
    />,
    { pageProps },
  )
})

describe('Renders components', () => {
  jest.mock('next/router', () => require('next-router-mock'))
  test('renders the top component', () => {
    expect(screen.getByText('テイクアウトする')).toBeInTheDocument()
  })

  test('renders the correct number of site banners', async () => {
    const banners = await screen.findAllByRole('img', { name: /slide-\d/ })
    /**
     * @memo
     * render時には1つしかdomで存在しないため
     */
    expect(banners).toHaveLength(1)
  })

  test('renders the icon box', async () => {
    await waitFor(() => {
      const iconBox = screen.getByTestId('icon-box')
      expect(iconBox).toBeInTheDocument()
    })
  })
})

describe('Dynamic styling', () => {
  test('renders the icon box with correct color', async () => {
    const colors = generateSiteColors(mainColor)

    await waitFor(() => {
      const iconBox = screen.getByTestId('icon-box')
      expect(iconBox).toBeInTheDocument()
      expect(iconBox).toHaveStyle(`background-color: ${colors.pale}`)
    })
  })

  test('renders the order button with correct color', async () => {
    await waitFor(() => {
      const button = screen.getByRole('button', { name: /お店で待たずに受け取り予約/ })

      expect(button).toBeInTheDocument()
      expect(button).toHaveStyle(`background-color: ${mainColor}`)
    })
  })
})
