let http = require("http");

let server = http.createServer((req, res) => {
    if (req.url == "/users") {
        let email = req.headers.email;
        res.write(`You are getting a user in response ${email}`);
        res.end();
    } else if (req.url == "/product") {
        res.write("You are getting a product in response");
        res.end();
    } else {
        res.statusCode = 404;
        res.write("Invalid URL");
        res.end();
    }
});

let port = 8080;

server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
