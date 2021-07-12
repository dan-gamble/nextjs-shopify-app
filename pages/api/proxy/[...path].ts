import { verifyProxySignature } from '../../../utils/shopify'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function proxy (req: NextApiRequest, res: NextApiResponse) {
  if (verifyProxySignature(req.query)) {
    res.setHeader('Content-Type', 'application/liquid')
    res
      .status(401)
      .send(`There was an error processing this request`)

    return
  }

  res.setHeader('Content-Type', 'application/liquid')

  return res.send(`
<p>This is a proxy page</p>
{%- assign num = 42 -%}
{{ num }}
  `)
}
