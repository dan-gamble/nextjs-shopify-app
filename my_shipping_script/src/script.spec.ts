import {
  CheckoutDomain as Domain,
  ShippingMethods,
  Currencies,
  Configuration,
  Money,
  Currency,
} from '@shopify/scripts-checkout-apis'
import { shippingMethodsHandler } from '../src/script'

/**
 * This function uses builder classes from Domain.TestHelper
 * to make it easier to create fake input objects such as
 * a Checkout. Edit this function or create copies to define
 * your own custom checkout objects to test against.
 */
function createPurchaseProposal (): Domain.PurchaseProposal {
  return new Domain.TestHelper.PurchaseProposalBuilder()
    .setLines([
      createLineItem({
        variant: {
          id: 1,
          title: 'Red Delicious',
          tags: ['Fruit', 'Red', 'Delicious'],
        },
        quantity: 1,
      }),
      createLineItem({
        variant: {
          id: 2,
          title: 'Red Floridango',
          tags: ['Fruit', 'Red', 'Floridango'],
        },
        quantity: 1,
      }),
    ])
    .build()
}

describe('run', () => {
  it('hides first option', () => {
    const purchaseProposal: Domain.PurchaseProposal = createPurchaseProposal()
    const cheapShippingMethod = createShippingMethod({
      id: 1,
      title: 'Cheap',
      money: { amount: 100, currency: Currencies.GBP },
    })
    const expensiveShippingMethod = createShippingMethod({
      id: 2,
      title: 'Expensive',
      money: { amount: 1000, currency: Currencies.GBP },
    })
    const shippingMethods = [cheapShippingMethod, expensiveShippingMethod]

    const result: ShippingMethods.Result = shippingMethodsHandler(
      new ShippingMethods.Input(purchaseProposal, shippingMethods),
      Configuration.fromMap(new Map<string, string>())
    )

    const filterResponse = result.filterResponse

    expect(filterResponse?.hiddenMethods[0].title).toBe('Cheap')
    expect(filterResponse?.hiddenMethods.length).toBe(1)
  })
})

type VariantOptions = {
  title: string,
  id: number,
  tags?: string[]
}

function createVariant ({ title, id, tags = [] }: VariantOptions) {
  const productBuilder = new Domain.TestHelper.ProductBuilder()
    .titled(title)
  if (tags?.length > 0) {
    tags?.forEach(tag => productBuilder.addTag(tag))
  }

  return new Domain.TestHelper.VariantBuilder()
    .withProduct(productBuilder.buildWithId(id))
    .buildWithId(id)
}

type MoneyOptions = {
  amount: number,
  currency: Currency
}

type LineItemOptions = {
  variant: VariantOptions,
  quantity: number,
  money?: MoneyOptions
}

function createLineItem ({
  variant,
  quantity,
  money = { amount: 1, currency: Currencies.GBP },
}: LineItemOptions) {
  return Domain.TestHelper.PurchaseProposalBuilder.line(
    createVariant(variant),
    quantity,
    Money.fromAmount(money.amount, money.currency),
  )
}

type ShippingMethodOptions = {
  id: number,
  title: string,
  money?: MoneyOptions,
}

function createShippingMethod ({ id, title, money = { amount: 1, currency: Currencies.GBP } }: ShippingMethodOptions) {
  return new Domain.TestHelper.ShippingMethodBuilder()
    .withTitle(title)
    .withAmount(Money.fromAmount(money.amount, money.currency))
    .buildWithId(id)
}
