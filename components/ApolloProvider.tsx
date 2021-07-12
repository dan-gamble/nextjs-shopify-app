import ApolloClient from 'apollo-boost'
import { ApolloProvider as Provider } from 'react-apollo'
import { fetch } from '@lib/app-bridge'
import { useAppBridge } from '@shopify/app-bridge-react'
import { useMemo } from 'react'
import { useRouteChangeLoader } from '../hooks/useRouteChangeLoader'

export default function ApolloProvider ({ children }) {
  const app = useAppBridge()

  const client = useMemo(
    () =>
      new ApolloClient({
        fetch: fetch(app),
        fetchOptions: {
          credentials: 'include',
        },
      }),
    [app],
  )

  // Used here as it's inside the AppBridgeProvider
  useRouteChangeLoader()

  return <Provider client={client}>{children}</Provider>
}
