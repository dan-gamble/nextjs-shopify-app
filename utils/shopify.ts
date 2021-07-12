import crypto from 'crypto'

type Query = {
  [key: string]: string | string[];
}

export function verifyProxySignature (query: Query,) {
  const { signature = '', ...otherQueryParams }: Query = <{ signature: string }>query

  delete otherQueryParams.path

  const input = Object.keys(otherQueryParams)
    .sort()
    .map(key => {
      const value = otherQueryParams[key]

      return `${key}=${value}`
    })
    .join('')

  const hmac = crypto
    .createHmac('sha256', process.env.SHOPIFY_API_SECRET)
    .update(input)
    .digest('hex')

  const digest = Buffer.from(hmac, 'utf-8')
  const checksum = Buffer.from(signature, 'utf-8')

  return (
    digest.length === checksum.length &&
    crypto.timingSafeEqual(digest, checksum)
  )
}
