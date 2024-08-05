const express = require("express");
const { createProduct } = require("../Controllers/ProductController");
const ProductRouter = express.Router();

ProductRouter.post("/", createProduct);

module.exports = ProductRouter;
