const products = [
    {
        name: "Classic Hoodie",
        price: 49.99,
        rating: 4.5,
        brand: "BrandA",
        category: "hoodie",
        gender: "men",
        stock: 120,
        discount: 10,
    },
    {
        name: "Slim Fit Trouser",
        price: 35.0,
        rating: 4.2,
        brand: "BrandB",
        category: "trouser",
        gender: "women",
        stock: 150,
        discount: 15,
    },
    {
        name: "Casual Shirt",
        price: 29.99,
        rating: 3.8,
        brand: "BrandC",
        category: "shirt",
        gender: "men",
        stock: 200,
        discount: 20,
    },
    {
        name: "Graphic T-Shirt",
        price: 19.99,
        rating: 4.0,
        brand: "BrandD",
        category: "t-shirt",
        gender: "women",
        stock: 100,
        discount: 5,
    },
    {
        name: "Skinny Denim",
        price: 59.99,
        rating: 4.7,
        brand: "BrandE",
        category: "denim",
        gender: "men",
        stock: 80,
        discount: 25,
    },
    {
        name: "Denim Jacket",
        price: 89.99,
        rating: 4.6,
        brand: "BrandF",
        category: "denim",
        gender: "women",
        stock: 90,
        discount: 30,
    },
    {
        name: "V-Neck T-Shirt",
        price: 22.5,
        rating: 3.5,
        brand: "BrandG",
        category: "t-shirt",
        gender: "men",
        stock: 160,
        discount: 12,
    },
    {
        name: "Formal Shirt",
        price: 45.0,
        rating: 4.3,
        brand: "BrandH",
        category: "shirt",
        gender: "women",
        stock: 130,
        discount: 18,
    },
    {
        name: "Relaxed Fit Trouser",
        price: 40.0,
        rating: 3.9,
        brand: "BrandI",
        category: "trouser",
        gender: "men",
        stock: 110,
        discount: 8,
    },
    {
        name: "Pullover Hoodie",
        price: 55.0,
        rating: 4.4,
        brand: "BrandJ",
        category: "hoodie",
        gender: "women",
        stock: 140,
        discount: 20,
    },
];
const url = "http://localhost:8080/product/";

for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(product);
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
