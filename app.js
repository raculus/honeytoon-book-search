const xlsxParser = require("./xlsx-parser");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const bookList = xlsxParser.getBookList();
  const genre = xlsxParser.getGenre();
  const bookcaseNums = xlsxParser.getBookcaseNums(bookList);

  res.render("index", {
    bookList: bookList,
    genre: genre,
    bookcaseNums: bookcaseNums,
  });
});

app.listen(port, () => {
  console.log(`Starting server : http://localhost:${port}`);
});
