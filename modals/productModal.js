const products = require("../data/product.json");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === parseInt(id));
    resolve(product);
  });
}

module.exports = {
  findAll,
  findById,
};
