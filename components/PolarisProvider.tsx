import { AppProvider } from '@shopify/polaris'
import translations from '@shopify/polaris/locales/en.json'
import { default as NextLink } from 'next/link'
import React from 'react'

function CustomLinkComponent ({ children, external, url, ...rest }) {
  const mailto = url.startsWith('mailto:')

  if (external || mailto) {
    const target = external ? '_blank' : '_top'
    const rel = external ? 'noopener noreferrer' : undefined

    return (
      <a target={target} href={url} rel={rel} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <NextLink href={url}>
      <a {...rest}>{children}</a>
    </NextLink>
  )
}

export default function PolarisProvider ({ children }) {
  return <AppProvider
    i18n={translations}
    linkComponent={CustomLinkComponent}
  >
    {children}
  </AppProvider>
}
