// 필터링 함수 생성
function applyFilters() {
  const bookList = document.querySelectorAll("#bookList tr");
  const searchKeyword = document.querySelector("#searchInput").value.toLowerCase();
  const selectedGenre = document.querySelector("#dropbtn-genre").textContent.split(" ")[1];
  const selectedBookcase = document.querySelector("#dropbtn-bookcase").textContent.split(" ")[1];

  bookList.forEach((book) => {
    // 필터링 조건을 먼저 검사한다.
    const bookGenre = book.querySelector(".genre-name").textContent;
    const bookcaseNum = book.querySelector(".bookcase-num").textContent;

    const genreMatch = selectedGenre === "전체" || selectedGenre === bookGenre;
    const bookcaseMatch = selectedBookcase === "전체" || selectedBookcase === bookcaseNum;
    const keywordMatch = book.querySelector("td:nth-child(2)").textContent.toLowerCase().includes(searchKeyword);

    if (genreMatch && bookcaseMatch && keywordMatch) {
      book.style.display = "table-row";
    } else {
      book.style.display = "none";
    }
  });
}

// 도서명 검색
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
  applyFilters();
});

// 장르 선택
const genreItems = document.querySelectorAll(".genre-item");
genreItems.forEach((item) => {
  item.addEventListener("click", () => {
    const clickedCode = item.dataset.code;
    document.getElementById("dropbtn-genre").innerText = `장르: ${clickedCode}`;
    applyFilters();
  });
});

// 책장 선택
const bookcaseItems = document.querySelectorAll(".bookcase-item");
bookcaseItems.forEach((item) => {
  item.addEventListener("click", () => {
    const clickedCode = item.dataset.code;
    document.getElementById("dropbtn-bookcase").innerText = `책장: ${clickedCode}`;
    applyFilters();
  });
});
