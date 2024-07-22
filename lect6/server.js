const mongoose = require("mongoose");
const app = require("./app");

const port = 8080;
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const DB_URL = process.env.DB_URL.replace(
    "<password>",
    process.env.DB_PASSWORD
);

const DB = mongoose.connect(DB_URL).then(() => {
    console.log("Connected to DB❤");
});
