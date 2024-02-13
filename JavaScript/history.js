function toggleMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');

    menuBtn.classList.toggle('open');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

function addToHistory() {
    const spotAddress = document.getElementById('spot-address').value;
    const spotInfo = document.getElementById('spot-info').value;
  
    if (spotAddress && spotInfo) {
      // 新しい履歴を作成
      const newHistoryItem = document.createElement('li');
      newHistoryItem.innerHTML = `<h3>${spotAddress}</h3><p class="recommendation-info">${spotInfo}</p>`;
      
      // 履歴リストに追加
      const historyList = document.getElementById('history-list');
      historyList.appendChild(newHistoryItem);
  
      // 入力フィールドをクリア
      document.getElementById('spot-address').value = '';
      document.getElementById('spot-info').value = '';
    }
  }
  