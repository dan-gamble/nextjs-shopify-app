import { useEffect } from 'react'
import { getSessionToken } from '@shopify/app-bridge-utils'
import { useAppBridge } from '@shopify/app-bridge-react'
import { LOGIN_URL } from '../constants'

export default function SessionProvider ({ children }) {
  const app = useAppBridge()

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSessionToken(app)

      if (!session) {
        window.location.pathname = LOGIN_URL
      }
    }

    checkSession()
  }, [])

  return <>{children}</>
}

