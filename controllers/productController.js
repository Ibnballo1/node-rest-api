const Product = require("../modals/productModal");
const { getPostData } = require("../utils");
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
    const body = await getPostData(req);

    const { title, description, price } = JSON.parse(body);
    const product = {
      title,
      description,
      price,
    };
    const newProduct = await Product.create(product);
    res.writeHead(201, { "content-type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

/// @Desc UPDATE SINGLE PRODUCT
/// @Route PUT /api/products/:id
/// @Access Public
async function updateProduct(req, res, id) {
  try {
    // first find the id
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
      // return;
    } else {
      const body = await getPostData(req);

      const { title, description, price } = JSON.parse(body);
      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };
      const updProduct = await Product.update(id, productData);
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(JSON.stringify(updProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

/// @Desc DELETE SINGLE PRODUCT
/// @Route DELETE /api/products/:id
/// @Access Public
async function deleteProduct(req, res, id) {
  try {
    // first find the id
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
      // return;
    } else {
      await Product.remove(id);
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(
        JSON.stringify({ message: `Product ${id} deleted successfully` })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
