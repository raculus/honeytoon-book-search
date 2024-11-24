const bodyParser = require("body-parser");
const express = require("express");
const SheetParser = require("./sheet-parser");
const app = express();
const port = 3001;

app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

sheet = new SheetParser();

app.get("/check-updates", async (req, res) => {
  const sheet2 = new SheetParser();
  await sheet2.init();

  // 변경 여부 확인
  const isUpdated = JSON.stringify(sheet2.getBookList()) !== JSON.stringify(sheet.getBookList());

  if (isUpdated) {
    sheet = sheet2; // 변경 사항 적용
    console.log("Sheet Updated");
  }

  res.json({ isUpdated }); // 변경 여부만 응답
});


app.get("/", async (req, res) => {
  const bookList = sheet.getBookList();
  const bookcaseNums = sheet.getBookcaseNumList();
  const genreList = sheet.getGenreList();

  res.render("index", {
    bookList: bookList,
    bookcaseNums: bookcaseNums,
    genreList: genreList,
  });
});

app.get("/map", (req, res) => {
  // const num = req.query.num;
  res.render("map", {
    num: req.query.num,
  });
});
// function managePage(req, res) {
//   const bookList = xlsxParser.getBookList();
//   const genre = xlsxParser.getGenre();
//   const bookcaseNums = xlsxParser.getBookcaseNums(bookList);
//   const sheetNames = xlsxParser.getSheetNames();
//   const manage = xlsxParser.getManage();

//   res.render("manage", {
//     sheetNames: sheetNames,
//     bookList: bookList,
//     bookcaseNums: bookcaseNums,
//     genre: genre,
//     manage: manage,
//   });
// }
// app.get("/manage", function (req, res) {
//   res.render("check-password", { isFail: false });
// });

// app.post("/manage", function (req, res) {
//   const manage = xlsxParser.getManage()[0];
//   const input = req.body.password;
//   if (input !== manage.PW) {
//     res.render("check-password", { isFail: true });
//   } else {
//     managePage(req, res);
//   }
// });


app.listen(port, () => {
  console.log(`Starting server : http://localhost:${port}`);
});
