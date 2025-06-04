
const map = L.map('map').setView([23.0305, 72.5649], 13); // Default location
let shopMarkers = [];
let userMarker = null;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

function getNearbyShops(lat, lon) {
    const radius = 15000; // 10 km
    const query = `
        [out:json][timeout:25];
        (
          node["shop"~"electronics|computer|mobile_phone"](around:${radius},${lat},${lon});
          way["shop"~"electronics|computer|mobile_phone"](around:${radius},${lat},${lon});
          relation["shop"~"electronics|computer|mobile_phone"](around:${radius},${lat},${lon});
        );
        out center tags;
      `;

    fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query,
        headers: { 'Content-Type': 'text/plain' }
    })
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById('shopList');
            list.innerHTML = '';
            shopMarkers.forEach(m => map.removeLayer(m));
            shopMarkers = [];

            if (!data.elements.length) {
                list.innerHTML = '<li>No nearby shops found.</li>';
                return;
            }

            data.elements.forEach((el, index) => {
                const name = el.tags?.name || 'Unnamed Shop';
                const shopLat = el.lat || el.center?.lat;
                const shopLon = el.lon || el.center?.lon;
                const type = el.tags?.shop || 'Shop';

                const phone = el.tags?.['contact:phone'] || el.tags?.phone || '';
                const website = el.tags?.['contact:website'] || el.tags?.website || '';
                const contactHTML = `${phone ? '📞 ' + phone : ''}${website ? '<br>🔗 <a href="' + website + '" target="_blank">Website</a>' : ''}`;

                const marker = L.marker([shopLat, shopLon])
                    .addTo(map)
                    .bindPopup(`<b>${name}</b><br>${type}${contactHTML}`);
                shopMarkers.push(marker);

                const li = document.createElement('li');
                li.innerHTML = `
            <strong>${name}</strong>${type}
            <button onclick="focusShop(${shopLat}, ${shopLon})">View on Map</button>
            ${contactHTML}`;
                list.appendChild(li);
            });
        })
        .catch(err => {
            console.error(err);
            document.getElementById('shopList').innerHTML = '<li>Error fetching data.</li>';
        });
}

function focusShop(lat, lon) {
    map.setView([lat, lon], 17, { animate: true });
}

function locateAndSearch() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                map.setView([lat, lon], 14);

                if (userMarker) map.removeLayer(userMarker);
                userMarker = L.circleMarker([lat, lon], {
                    radius: 8,
                    fillColor: 'red',
                    color: '#fff',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.9
                }).addTo(map).bindPopup("You are here").openPopup();

                getNearbyShops(lat, lon);
            },
            err => {
                alert("Could not get location. Using default location (Ahmedabad).");
                getNearbyShops(23.0305, 72.5649);
            }
        );
    } else {
        alert("Geolocation not supported. Using default location.");
        getNearbyShops(23.0305, 72.5649);
    }
}

locateAndSearch();

// redirect with validation
function redirectWithFallback(primaryUrl, fallbackUrl) {
    fetch(primaryUrl, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                window.location.href = primaryUrl;
            } else {
                window.location.href = fallbackUrl;
            }
        })
        .catch(() => {
            window.location.href = fallbackUrl;
        });
}

document.getElementById("solution").addEventListener("click", function () {
    // window.location.href = window.location.origin + "/index.html";
    // window.location.href = window.location.origin + "/TechnoPharms/index.html";
    redirectWithFallback(window.location.origin + "/solution.html",window.location.origin + "/TechnoPharms/solution.html")
});

document.getElementById("Login").addEventListener("click", function () {
    // window.location.href = window.location.origin + "/index.html";
    // window.location.href = window.location.origin + "/TechnoPharms/index.html";
    redirectWithFallback(window.location.origin + "/Login.html",window.location.origin + "/TechnoPharms/Login.html")
});