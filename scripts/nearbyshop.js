const map = L.map('map').setView([23.0305, 72.5649], 13); // fallback default

let shopMarkers = [];

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

function addUserMarker(lat, lon) {
    const marker = L.circleMarker([lat, lon], {
        radius: 8,
        fillColor: 'red',
        color: '#fff',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.9
    }).addTo(map).bindPopup("You are here").openPopup();
}

function fetchAndDisplayShops(lat, lon) {
    fetch(`scripts/fetch_nearby_shops.php?lat=${lat}&lon=${lon}`)
        .then(res => res.json())
        .then(data => {
            shopMarkers.forEach(m => map.removeLayer(m));
            shopMarkers = [];

            if (!data.length) {
                alert("No shops found within 5 km.");
                return;
            }

            data.forEach(shop => {
                const { shop_name, shopkeeper_name, contact_number, shop_latitude, shop_longitude, distance , shop_description} = shop;

                const popupHtml = `
                    <strong>${shop_name}</strong><br>
                    📝 ${shop_description ? shop_description : "No description provided."}<br>
                    👨‍🔧 ${shopkeeper_name}<br>
                    ☎️ <b>${contact_number}</b><br>
                    📍 ${distance} km away<br>
                    <button onclick=" window.location.href = 'tel:${contact_number}'">📞 Call Now</button>
                `;

                const marker = L.marker([shop_latitude, shop_longitude])
                    .addTo(map)
                    .bindPopup(popupHtml);
                shopMarkers.push(marker);
            });
        })
        .catch(err => {
            console.error(err);
            document.getElementById('shopList').innerHTML = '<li>Error loading shops.</li>';
        });
}

function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            // const lat = pos.coords.latitude;
            const lat = 23.115618
            // const lon = pos.coords.longitude;
            const lon = 72.630207;
            map.setView([lat, lon], 13);
            addUserMarker(lat, lon);
            fetchAndDisplayShops(lat, lon);
        }, () => {
            alert("Location denied. Using default (Ahmedabad).");
            fetchAndDisplayShops(23.115618, 72.630207);
            // 23.115618, 72.630207
        });
    } else {
        alert("Geolocation not supported.");
        fetchAndDisplayShops(72.630207, 72.630207);
    }
}

initMap();