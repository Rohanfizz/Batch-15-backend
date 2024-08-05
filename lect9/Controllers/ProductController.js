const { CatchAsync } = require("../errorHandling/utils");
const ProductModel = require("../Models/ProductModel");

exports.createProduct = CatchAsync(async function (req, res, next) {
    const { name, price, rating, brand, category, gender, stock, discount } =
        req.body;
    const product = await ProductModel.create({
        name,
        price,
        rating,
        brand,
        category,
        gender,
        stock,
        discount,
    });
    res.send(201).json({
        status: "success",
        product,
    });
});
