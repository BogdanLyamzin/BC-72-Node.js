const path = require("node:path");

// const moviesPath = path.join(__dirname, "movies.json");
// console.log(moviesPath);
const moviesPath = path.resolve("movies", "movies.json");
console.log(moviesPath);