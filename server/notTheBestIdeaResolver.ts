const getProducts = (affiliateId) => {
  return {
    ...getProductsFromDb(),
    image: getFile(),
    displayPrice: getDisplayPrice(),
    originalPrice: getDisplayPrice()
  }
}

const notTheBestIdeaAffiliateQuery = (parent, args, context, info) => {
  return {
    ...getAffiliateDataFromDb(),
    products: getProductsFromDb(args.id)
  }
}
