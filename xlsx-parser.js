const xlsx = require("xlsx");

const filename = "books.xlsx";

const workbook = xlsx.readFile(filename);

const names_booklist = workbook.SheetNames[0];
const names_genre = workbook.SheetNames[1];
const names_isComplete = workbook.SheetNames[2];

const sheet_booklist = workbook.Sheets[names_booklist];
const sheet_genre = workbook.Sheets[names_genre];
const sheet_isComplete = workbook.Sheets[names_isComplete];

const data_booklist = xlsx.utils.sheet_to_json(sheet_booklist);
const data_genre = xlsx.utils.sheet_to_json(sheet_genre);
const data_isComplete = xlsx.utils.sheet_to_json(sheet_isComplete);

function getBookList() {
  return data_booklist;
}

function getGenre() {
  return data_genre;
}

function getIsComplete() {
  return data_isComplete;
}

module.exports = {
  getBookList,
  getGenre,
  getIsComplete,
};
