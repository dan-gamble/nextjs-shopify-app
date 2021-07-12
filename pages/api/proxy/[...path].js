import { validateProxy } from '../../../utils/shopify'

export default async function proxy (req, res) {
  if (!validateProxy(req)) {
    res
      .status(403)
      .send('Signature verification for shopify proxy request failed')

    return
  }

  res.setHeader('Content-Type', 'application/liquid')
  res.write('<p>Cheese</p>')
  res.end()

  return '<p>Test</p>'
}
