const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    active: {
        type: Boolean,
        default: true,
    },
    name: {
        type: String,
        required: [true, "Please provide a valid name!"],
    },
    price: {
        type: Number,
        required: [true, "Please provide a valid price!"],
        min: 0,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 3,
    },
    brand: {
        type: String,
        required: [true, "Please provide a valid Brand Name!"],
    },
    category: {
        type: String,
        enum: ["hoodie", "trouser", "shirt", "t-shirt", "denim"],
        default: "user",
    },
    gender: {
        type: String,
        enum: ["men", "women"],
        required: [true, "Please provide a valid gender"],
    },
    stock: {
        type: Number,
        default: 100,
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
    },
});

const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;
