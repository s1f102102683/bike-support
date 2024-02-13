let map;
let startMarker, destinationMarker;

function initMap() {
    const japanBounds = [
        [24.396308, 122.934570],
        [45.551483, 153.986672]
    ]; // 日本の緯度経度範囲

    map = L.map('map', {
        center: [35.6895, 139.6917], // 任意の初期表示位置（例：東京）
        zoom: 7, // 任意の初期ズームレベル
        maxBounds: japanBounds, // 日本の範囲外には移動できないようにする
        maxBoundsViscosity: 1.0, // maxBoundsが適用される速度を調整
    });

    L.tileLayer('https://{s}.tile.openstreetmap.jp/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
    }).addTo(map);
}

function showPinsAndDistance() {
    const startInput = document.getElementById('start');
    const destinationInput = document.getElementById('destination');
    const distanceResult = document.getElementById('distance-result');

    const startAddress = startInput.value;
    const destinationAddress = destinationInput.value;

    // ピンを削除
    if (startMarker) {
        map.removeLayer(startMarker);
    }
    if (destinationMarker) {
        map.removeLayer(destinationMarker);
    }

    geocodeAddress(startAddress, 'start');
    geocodeAddress(destinationAddress, 'destination', (distance) => {
        distanceResult.innerHTML = `道のりの距離: ${distance.toFixed(2)} km`;
    });
}

function geocodeAddress(address, type, callback) {
    const nominatimEndpoint = 'https://nominatim.openstreetmap.org/search';
    const format = 'json';
    const requestUrl = `${nominatimEndpoint}?format=${format}&q=${encodeURIComponent(address)}`;

    fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const location = {
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon)
                };
                addMarker(location, type);

                // 両方のピンが表示される範囲を計算して地図を調整
                const bounds = new L.LatLngBounds();
                for (const layerId in map._layers) {
                    const layer = map._layers[layerId];
                    if (layer instanceof L.Marker) {
                        bounds.extend(layer.getLatLng());
                    }
                }
                map.fitBounds(bounds);

                if (type === 'destination') {
                    calculateDistance();
                }
            } else {
                console.error(`Geocodingエラー: ${type}の結果がありません。`);
            }
        })
        .catch(error => {
            console.error('Geocodingエラー:', error);
        });
}

function addMarker(location, type) {
    const popupContent = type === 'start' ? '現在地のピン' : '目的地のピン';

    const marker = L.marker([location.lat, location.lng]).bindPopup(popupContent).openPopup().addTo(map);

    // ピンを保持
    if (type === 'start') {
        startMarker = marker;
    } else if (type === 'destination') {
        destinationMarker = marker;
    }
}

function calculateDistance() {
    if (startMarker && destinationMarker) {
        const startLatLng = startMarker.getLatLng();
        const destinationLatLng = destinationMarker.getLatLng();
        const distance = startLatLng.distanceTo(destinationLatLng) / 1000; // in kilometers

        document.getElementById('distance-result').innerHTML = `道のりの距離: ${distance.toFixed(2)} km`;
    }
}

function toggleMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');

    menuBtn.classList.toggle('open');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

document.addEventListener('DOMContentLoaded', initMap);

// 新しいページ: おすすめスポット一覧
function showRecommendations() {
    const content = document.getElementById('content');
    content.innerHTML = '<h1>おすすめスポット一覧</h1><p>おすすめのスポットが表示されます。</p>';
    // 他のページへの切り替え時に必要な処理を追加
}

// 新しいページ: 履歴
function showHistory() {
    const content = document.getElementById('content');
    content.innerHTML = '<h1>履歴</h1><p>過去の検索や訪れたスポットの履歴が表示されます。</p>';
    // 他のページへの切り替え時に必要な処理を追加
}