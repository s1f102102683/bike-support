document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // バックエンドに認証情報を送信するなどの処理を追加
    // ここではサンプルとしてコンソールに表示するだけ
    console.log('Username:', username);
    console.log('Password:', password);

    // ログイン成功時に目的地検索画面に遷移
    window.location.href = 'index.html';
});


function toggleMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');

    menuBtn.classList.toggle('open');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}