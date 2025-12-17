module.exports.newProductsPrice = (products) => {
  const newProducts = products.map((product) => {
    product.newPrice = (
      (product.price * (100 - product.discountPercentage)) /
      100
    ).toFixed(0);
    return product;
  });
  return newProducts;
};

module.exports.newProductPrice = (product) => {
  product.newPrice = (
    (product.price * (100 - product.discountPercentage)) /
    100
  ).toFixed(0);
};
