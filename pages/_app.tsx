import { useRouter } from 'next/router'
import EmbeddedApp from '@components/EmbeddedApp'

import '@shopify/polaris/dist/styles.css'

function App ({ Component, pageProps }) {
  const { pathname } = useRouter()
  const isEmbedded = pathname.startsWith('/embedded')

  return (
    <>
      {isEmbedded
        ? <EmbeddedApp><Component {...pageProps} /></EmbeddedApp>
        : <Component {...pageProps} />
      }
    </>
  )
}

export default App
