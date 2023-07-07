const xlsxParser = require("./xlsx-parser");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.static('views'));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const bookList = xlsxParser.getBookList();
  const genre = xlsxParser.getGenre();
  res.render("index", {
    bookList: bookList,
    genre: genre,
  });
});

app.get("/api/book-list", (req, res) => {
  const bookList = xlsxParser.getBookList();
  res.send(bookList);
});

app.get("/api/genre", (req, res) => {
  const genre = xlsxParser.getGenre();
  res.send(genre);
});

app.get("/api/is-complete", (req, res) => {
  const isComplete = xlsxParser.getIsComplete();
  res.send(isComplete);
});

app.listen(port, () => {
  console.log(`Starting server : http://localhost:${port}`);
});
