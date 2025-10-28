const fs = require("fs");

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
    console.log(err);
  });
}

function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(body);
        // const { title, description, price } = JSON.parse(body);
        // const product = {
        //   title,
        //   description,
        //   price,
        // };
        // const newProduct = await product.create(product);
        // resolve.writeHead(201, { "content-type": "application/json" });
        // return resolve.end(JSON.stringify(newProduct));
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  writeDataToFile,
  getPostData,
};
