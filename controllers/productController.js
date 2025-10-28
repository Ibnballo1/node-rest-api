const Product = require("../modals/productModal");

/// @Desc GET ALL PRODUCTS
/// @Route GET /api/products
/// @Access Public
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

/// @Desc GET SINGLE PRODUCT
/// @Route GET /api/products/:id
/// @Access Public
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
      // return;
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

/// @Desc CREATE A PRODUCT
/// @Route POST /api/products
/// @Access Public
async function createProduct(req, res) {
  try {
    const product = {
      title: "Test Product",
      description: "This is a test product",
      price: 29.99,
    };
    const newProduct = await Product.create(product);
    res.writeHead(201, { "content-type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
};
