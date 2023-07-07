const genreItems = document.querySelectorAll('.genre-item');
const bookList = document.getElementById('bookList');

genreItems.forEach(item => {
  item.addEventListener('click', () => {
    // 클릭한 아이템의 코드를 가져온다.
    const code = item.dataset.code;

    // 모든 tr 요소들을 가져온다.
    const trs = bookList.getElementsByTagName('tr');

    if (code === 'all') {
      for (let i = 0; i < trs.length; i++) {
        trs[i].style.display = '';
      }
      return;
    }

    // 모든 tr 요소들을 순회하고, data-code 속성의 값을 검사한다.
    for (let i = 0; i < trs.length; i++) {
      const trCode = trs[i].dataset.code;
      if (trCode === code) {
        // 선택된 아이템과 동일한 code 값을 갖는 tr 요소는 보여준다.
        trs[i].style.display = '';
      } else {
        // 선택된 아이템과 다른 code 값을 갖는 tr 요소는 숨긴다.
        trs[i].style.display = 'none';
      }
    }
  });
});