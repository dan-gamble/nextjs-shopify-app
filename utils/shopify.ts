import crypto from 'crypto'
import queryString from 'querystring'
import { NextApiRequest } from 'next'

export function validateProxy (req: NextApiRequest) {
  const urlQuery = req.url.split('?')[1]
  const query = queryString.parse(urlQuery)
  const signature = query.signature
  delete query.signature

  const input = Object.keys(query)
    .sort()
    .map(function (key) {
      let value = query[key]

      if (!Array.isArray(value)) {
        value = [value]
      }

      return `${key}=${value.join(',')}`
    })
    .join('')
  const hash = crypto
    .createHmac('sha256', process.env.SHOPIFY_API_SECRET)
    .update(input)
    .digest('hex')

  return signature === hash
}
