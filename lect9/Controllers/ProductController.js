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

exports.getProducts = CatchAsync(async function (req, res, next) {
    let queryObj = { ...req.query };
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryObj = JSON.parse(queryStr);

    const excludeKeys = ["page", "sort", "limit", "fields"];
    excludeKeys.forEach((key) => {
        delete queryObj[key];
    });
    let productsQuery = ProductModel.find(queryObj);

    // Sorting
    if(req.query.sort){
        const sortingQuery = req.query.sort.split(',').join(' ');
        productsQuery = productsQuery.sort(sortingQuery)
    }
    //Pagination
    //Limiting

    const products = await productsQuery; // once the query is ready, i will await and get results
    res.status(200).json({
        status: "success",
        products,
    });
});
