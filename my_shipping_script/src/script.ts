import {
  ShippingMethods, Configuration, Console, CheckoutDomain as Domain,
} from '@shopify/scripts-checkout-apis'

export function shippingMethodsHandler (
  input: ShippingMethods.Input,
  configuration: Configuration, // eslint-disable-line @shopify/assemblyscript/no-unused-vars
): ShippingMethods.Result {
  // Use `Console.log` to print output from your script.
  Console.log('Hello, world')

  const sortResponse = new ShippingMethods.SortResponse([])
  const filterResponse = filterShippingMethod(input.shippingMethods)
  const renameResponse = new ShippingMethods.RenameResponse([])

  return new ShippingMethods.Result(sortResponse, filterResponse, renameResponse)
}

function filterShippingMethod (
  shippingMethods: Domain.ShippingMethod[]
): ShippingMethods.FilterResponse {
  let hiddenMethods = new Array<Domain.ShippingMethod>()

  if (shippingMethods.length > 0) {
    hiddenMethods.push(shippingMethods[0])
  }

  return new ShippingMethods.FilterResponse(hiddenMethods)
}
