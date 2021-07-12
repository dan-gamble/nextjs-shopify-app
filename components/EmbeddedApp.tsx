import { useEffect, useState } from 'react'
import { Provider as AppBridgeProvider } from '@shopify/app-bridge-react'
import PolarisProvider from '@components/PolarisProvider'
import SessionProvider from '@components/SessionProvider'
import ApolloProvider from '@components/ApolloProvider'
import RoutePropagator from '@components/RoutePropagator'
import { useRouteChangeLoader } from '../hooks/useRouteChangeLoader'

export default function EmbeddedApp ({ children }) {
  const API_KEY = process.env.NEXT_PUBLIC_SHOPIFY_APP_API_KEY
  const [host, setHost] = useState('')

  useEffect(() => {
    const url = new URL(window.location.href)

    // If host is not set, than the page is being loaded outside of App Bridge
    // so we should proceed with starting OAuth
    if (url.searchParams.has('host')) {
      setHost(url.searchParams.get('host'))
    } else {
      window.location.pathname = `/api/auth/shopify/login`
    }
  }, [])

  return <>
    {host && <>
      <PolarisProvider>
        <AppBridgeProvider config={{ apiKey: API_KEY, host, forceRedirect: true }}>
          <SessionProvider>
            <RoutePropagator />

            <ApolloProvider>
              {children}
            </ApolloProvider>
          </SessionProvider>
        </AppBridgeProvider>
      </PolarisProvider>
    </>}
  </>
}
