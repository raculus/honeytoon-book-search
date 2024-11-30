const axios = require('axios');

class SheetParser {
  constructor() {
    this.url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTgCuVKm3eT-h_n9btcKvJJSiZsqUZQFiRNpN5zDhabx4rbZVpdRRuNhbzQQgjccgLDyVmfSE1C8kTg/pub?output=tsv";
    this.bookList = null;
    if (this.bookList === null) {
      this.init();
    }
  }

  async init(){
    this.bookList = await this.parseBookList();
    this.bookcaseNumList = this.parseBookcaseNums();
    this.genreList = this.parseGenre();
  }


  getBookList() {
    return this.bookList;
  }
  getBookcaseNumList() {
    return this.bookcaseNumList;
  }
  getGenreList() {
    return this.genreList;
  }


  async fetchSheet() {
    try {
      const response = await axios.get(this.url);
      const csvData = response.data;
      return csvData;
    } catch (error) {
      console.error('Error fetching spreadsheet data:', error);
      console.log('Retrying...');
      return await this.fetchSheet();
    }
  }

  async parseBookList() {
    const csvData = await this.fetchSheet();
    const rows = csvData.split('\n');
    const books = rows.map(row => {
      const [bookcaseNum, title, volume, isComplete, genre] = row.split('\t');
      return {
        bookcaseNum,
        title,
        volume,
        isComplete,
        genre
      };
    });
    books.shift();
    return books;
  }

  // sortBooks(books) {
  //   const sorted = books.sort((b, a) => {
  //     return a.bookcaseNum - b.bookcaseNum || a.columnNum - b.columnNum;
  //   });
  //   return sorted;
  // }

  parseGenre() {
    const genreSet = new Set();

    this.bookList.forEach(book => {
      if (!genreSet.has(book.genre)) {
        genreSet.add(book.genre);
      }
    });
    return Array.from(genreSet);
  }

  parseBookcaseNums() {
    const bookcaseSet = new Set();

    this.bookList.forEach(book => {
      if (isNaN(book.bookcaseNum)) {
        return;
      } else if (book.bookcaseNum === '') {
        return;
      } else if (!bookcaseSet.has(book.bookcaseNum)) {
        bookcaseSet.add(book.bookcaseNum);
      }
    });
    return Array.from(bookcaseSet);
  }
}

module.exports = SheetParser;