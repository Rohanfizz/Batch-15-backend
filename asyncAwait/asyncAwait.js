// Synchronously
// Parallely / Asynchronously
const fs = require("fs");

function fileReaderSync() {
    const data = fs.readFileSync("./file.txt", "utf-8");
    console.log(data);
}

console.log("Starting script");

fs.readFile("file.txt", "utf8", function (err, data) {
    // Display the file content
    console.log(data);
});
// console.log(fs.readFileSync("./file.txt", "utf8"));
console.log("Ending script");
