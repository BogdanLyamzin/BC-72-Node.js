const path = require("node:path");

const path1 = path.join("movies", "movies.json");
// console.log(path1);
// console.log(__dirname);
const path2 = path.join(__dirname, "movies", "movies.json");
// console.log(path2);
const path3 = path.resolve("movies", "movies.json");
console.log(path3);