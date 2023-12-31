const xlsx = require("xlsx");

const filename = "books.xlsx";

const workbook = xlsx.readFile(filename);

const names_booklist = workbook.SheetNames[0];
const names_genre = workbook.SheetNames[1];
const names_isComplete = workbook.SheetNames[2];
const names_manage = workbook.SheetNames[3];

let sheetNames = [];
sheetNames.push(names_booklist);
sheetNames.push(names_genre);
sheetNames.push(names_isComplete);
sheetNames.push(names_manage);

const sheet_booklist = workbook.Sheets[names_booklist];
const sheet_genre = workbook.Sheets[names_genre];
const sheet_isComplete = workbook.Sheets[names_isComplete];
const sheet_manage = workbook.Sheets[names_manage];

let data_booklist = xlsx.utils.sheet_to_json(sheet_booklist);
let data_genre = xlsx.utils.sheet_to_json(sheet_genre);
let data_isComplete = xlsx.utils.sheet_to_json(sheet_isComplete);
let data_manage = xlsx.utils.sheet_to_json(sheet_manage);

function reloadXlsx() {
  const reloadedWorkbook = xlsx.readFile(filename);

  const reloadedData_booklist = xlsx.utils.sheet_to_json(reloadedWorkbook.Sheets[names_booklist]);
  const reloadedData_genre = xlsx.utils.sheet_to_json(reloadedWorkbook.Sheets[names_genre]);
  const reloadedData_isComplete = xlsx.utils.sheet_to_json(reloadedWorkbook.Sheets[names_isComplete]);
  const reloadedData_manage = xlsx.utils.sheet_to_json(reloadedWorkbook.Sheets[names_manage]);

  data_booklist = reloadedData_booklist;
  data_genre = reloadedData_genre;
  data_isComplete = reloadedData_isComplete;
  data_manage = reloadedData_manage;
}

function getBookList() {
  return data_booklist;
}

function getGenre() {
  return data_genre;
}

function getIsComplete() {
  return data_isComplete;
}
function getManage() {
  return data_manage;
}
function getSheetNames() {
  return sheetNames;
}

function getBookcaseNums(data) {
  // 책장번호를 담을 배열
  const bookcaseNums = [];

  // 데이터 반복문을 돌면서 책장번호 배열에 추가
  data.forEach((book) => {
    const bookcaseNum = parseInt(book.책장번호, 10);
    if (!bookcaseNums.includes(bookcaseNum)) {
      bookcaseNums.push(bookcaseNum);
    }
  });

  // 책장번호 오름차순으로 정렬
  bookcaseNums.sort((a, b) => a - b);

  // 책장번호를 문자열로 변환하여 반환
  return bookcaseNums;
}

module.exports = {
  getBookList,
  getGenre,
  getIsComplete,
  getBookcaseNums,
  reloadXlsx,
  getManage,
  getSheetNames,
};
