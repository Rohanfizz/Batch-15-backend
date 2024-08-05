const express = require("express");
const { createProduct, getProducts } = require("../Controllers/ProductController");
const ProductRouter = express.Router();

ProductRouter.post("/", createProduct);
ProductRouter.get("", getProducts);

module.exports = ProductRouter;
