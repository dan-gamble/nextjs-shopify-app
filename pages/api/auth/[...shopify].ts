import { prisma } from '@lib/prisma'
import Shopify, {ShopifyAuth} from '@lib/shopify';

type AfterAuthOptions = {
  accessToken: string
  shop: string
}

export default ShopifyAuth({
  afterAuth: async (req, res, { accessToken, shop }: AfterAuthOptions) => {
    await prisma.shop.upsert({
      where: {
        shopifyDomain: shop
      },
      update: {
        shopifyToken: accessToken,
      },
      create: {
        shopifyToken: accessToken,
        shopifyDomain: shop,
      }
    })

    const response = await Shopify.Webhooks.Registry.register({
      shop,
      accessToken,
      path: "/api/webhooks/shopify",
      topic: "APP_UNINSTALLED",
      webhookHandler: (topic, shop, body) => {
        return Promise.resolve(
          console.log('APP_UNINSTALLED handler was executed')
        )
      },
    });

    if (!response.success) {
      console.log(
        `Failed to register APP_UNINSTALLED webhook: ${response.result}`
      );
    } else {
      console.log('APP_UNINSTALLED Webhook was successfully registered')
    }
  }
});
