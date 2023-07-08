const trList = document.querySelectorAll("tbody#bookList tr");
let currentImage = null;
let previousClickedRow = null;

for (let i = 0; i < trList.length; i++) {
  trList[i].addEventListener("click", function () {
    const bookcaseNum = parseInt(trList[i].getElementsByClassName("bookcase-num")[0].textContent);
    // 이미지 토글
    if (this === previousClickedRow) {
      if (currentImage) {
        const parent = currentImage.parentNode.parentNode;
        parent.remove();
        parent.removeChild(currentImage.parentNode);
        currentImage = null;
      }
      previousClickedRow = null;
      return;
    }

    // 이미지 삭제
    if (currentImage) {
      const parent = currentImage.parentNode.parentNode;
      parent.remove();
      parent.removeChild(currentImage.parentNode);
      currentImage = null;
    }

    // 이미지 추가
    const newRow = document.createElement("tr");
    newRow.classList.add("image-row");

    const object = document.createElement("object");
    object.data = `map?num=${bookcaseNum}`;
    const td = document.createElement("td");
    td.colSpan = 9;
    td.appendChild(object);
    newRow.appendChild(td);

    this.insertAdjacentElement("afterend", newRow);

    currentImage = object;
    previousClickedRow = this;
  });
}

// 검색 필터링
function applyFilters() {
  const bookList = document.querySelectorAll("#bookList > tr");
  const searchKeyword = document.querySelector("#searchInput").value.toLowerCase();
  const selectedGenre = document.querySelector("#dropbtn-genre").textContent.split(" ")[1];
  const selectedBookcase = document.querySelector("#dropbtn-bookcase").textContent.split(" ")[1];
  let filteredBooks = [];

  bookList.forEach((book) => {
    // 필터링 조건을 먼저 검사한다.
    const bookGenre = book.querySelector(".genre-name").textContent;
    const bookcaseNum = book.querySelector(".bookcase-num").textContent;

    const genreMatch = selectedGenre === "전체" || selectedGenre === bookGenre;
    const bookcaseMatch = selectedBookcase === "전체" || selectedBookcase === bookcaseNum;
    const keywordMatch = book.querySelector("td:nth-child(2)").textContent.toLowerCase().includes(searchKeyword);

    if (genreMatch && bookcaseMatch && keywordMatch) {
      filteredBooks.push(book);
    } else {
      book.style.display = "none";
    }
  });

  // 홀수번째 책과 짝수번째 책에 다른 스타일을 적용한다.
  filteredBooks.forEach((book, index) => {
    if (index % 2 === 0) {
      book.classList.remove("odd");
      book.classList.add("even");
    } else {
      book.classList.remove("even");
      book.classList.add("odd");
    }
    book.style.display = "table-row";
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

applyFilters();
