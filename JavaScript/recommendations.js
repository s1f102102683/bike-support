function toggleMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');

    menuBtn.classList.toggle('open');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

function viewSpotDetails(spotName) {
    // 画像のパスを取得
    const element = document.querySelector(`[data-spot="${spotName}"]`);
    if (element) {
        const imageSrc = element.getAttribute('data-image');

        // モーダル内の画像にパスをセット
        const modalImage = document.getElementById('modal-image');
        modalImage.src = imageSrc;

        // モーダルを表示
        const modal = document.getElementById('image-modal');
        modal.style.display = 'block';

        // モーダルの閉じるボタンにイベントリスナーを追加（一度だけ）
        const closeModalBtn = document.getElementById('close-modal-btn');
        closeModalBtn.removeEventListener('click', closeModal);
        closeModalBtn.addEventListener('click', closeModal);
    } else {
        console.error(`要素が見つかりませんでした: [data-spot="${spotName}"]`);
    }
}

// 画像モーダルを閉じる
function closeModal() {
    const modal = document.getElementById('image-modal');
    modal.style.display = 'none';
}

