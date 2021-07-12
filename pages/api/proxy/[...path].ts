import { validateProxy } from '../../../utils/shopify'

export default async function proxy (req, res) {
  if (!validateProxy(req)) {
    res
      .status(403)
      .send('Signature verification for shopify proxy request failed')

    return
  }

  res.setHeader('Content-Type', 'application/liquid')

  return res.send(`
<p>This is a proxy page</p>
{%- assign num = 42 -%}
{{ num }}
  `)
}
