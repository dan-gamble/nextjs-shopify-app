import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Context as AppBridgeContext, useRoutePropagation } from '@shopify/app-bridge-react'
import { Redirect } from '@shopify/app-bridge/actions'

const RoutePropagator = () => {
  const router = useRouter()
  const appBridge = useContext(AppBridgeContext)

  useRoutePropagation(router.asPath)

  // Subscribe to appBridge changes - captures appBridge urls
  // and sends them to Next.js router. Use useEffect hook to
  // load once when component mounted
  useEffect(() => {
    const unsubscribe = appBridge.subscribe(Redirect.Action.APP, ({ path }) => {
      if (router.asPath !== path) {
        router.push(path)
      }
    })

    return unsubscribe
  }, [router])

  return null
}

export default RoutePropagator
