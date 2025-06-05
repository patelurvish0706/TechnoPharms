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
    // fetch(`scripts/fetch_nearby_shops.php?lat=${lat}&lon=${lon}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         document.getElementById('shopList').innerHTML = '';
    //         shopMarkers.forEach(m => map.removeLayer(m));
    //         shopMarkers = [];

    //         if (data.length === 0) {
    //             document.getElementById('shopList').innerHTML = '<li>No nearby shops found.</li>';
    //             return;
    //         }

    //         data.forEach(shop => {
    //             const marker = L.marker([shop.shop_latitude, shop.shop_longitude])
    //                 .addTo(map)
    //                 .bindPopup(`<b>${shop.shop_name}</b><br>${shop.shop_description || ''}<br>📞 ${shop.contact_number}`);
    //             shopMarkers.push(marker);

    //             const li = document.createElement('li');
    //             li.innerHTML = 
    //             `<strong>${shop.shop_name}</strong><br>
    //             📞 ${shop.contact_number} <br>
    //             🛣️ ${shop.distance} km away
    //             <button onclick="map.setView([${shop.shop_latitude}, ${shop.shop_longitude}], 17)">View on Map</button>`;
    //             document.getElementById('shopList').appendChild(li);
    //         });
    //     })

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
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            map.setView([lat, lon], 14);
            addUserMarker(lat, lon);
            fetchAndDisplayShops(lat, lon);
        }, () => {
            alert("Location denied. Using default (Ahmedabad).");
            fetchAndDisplayShops(23.0305, 72.5649);
        });
    } else {
        alert("Geolocation not supported.");
        fetchAndDisplayShops(23.0305, 72.5649);
    }
}

initMap();

// const map = L.map('map').setView([23.0305, 72.5649], 13); // Default location
// let shopMarkers = [];
// let userMarker = null;

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: 'Map data © <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors'
// }).addTo(map);

// function getNearbyShops(lat, lon) {
//     const radius = 15000; // 10 km
//     const query = `
//         [out:json][timeout:25];
//         (
//           node["shop"~"electronics|computer|mobile_phone"](around:${radius},${lat},${lon});
//           way["shop"~"electronics|computer|mobile_phone"](around:${radius},${lat},${lon});
//           relation["shop"~"electronics|computer|mobile_phone"](around:${radius},${lat},${lon});
//         );
//         out center tags;
//       `;

//     fetch('https://overpass-api.de/api/interpreter', {
//         method: 'POST',
//         body: query,
//         headers: { 'Content-Type': 'text/plain' }
//     })
//         .then(res => res.json())
//         .then(data => {
//             const list = document.getElementById('shopList');
//             list.innerHTML = '';
//             shopMarkers.forEach(m => map.removeLayer(m));
//             shopMarkers = [];

//             if (!data.elements.length) {
//                 list.innerHTML = '<li>No nearby shops found.</li>';
//                 return;
//             }

//             data.elements.forEach((el, index) => {
//                 const name = el.tags?.name || 'Unnamed Shop';
//                 const shopLat = el.lat || el.center?.lat;
//                 const shopLon = el.lon || el.center?.lon;
//                 const type = el.tags?.shop || 'Shop';

//                 const phone = el.tags?.['contact:phone'] || el.tags?.phone || '';
//                 const website = el.tags?.['contact:website'] || el.tags?.website || '';
//                 const contactHTML = `${phone ? '📞 ' + phone : ''}${website ? '<br>🔗 <a href="' + website + '" target="_blank">Website</a>' : ''}`;

//                 const marker = L.marker([shopLat, shopLon])
//                     .addTo(map)
//                     .bindPopup(`<b>${name}</b><br>${type}${contactHTML}`);
//                 shopMarkers.push(marker);

//                 const li = document.createElement('li');
//                 li.innerHTML = `
//             <strong>${name}</strong>${type}
//             <button onclick="focusShop(${shopLat}, ${shopLon})">View on Map</button>
//             ${contactHTML}`;
//                 list.appendChild(li);
//             });
//         })
//         .catch(err => {
//             console.error(err);
//             document.getElementById('shopList').innerHTML = '<li>Error fetching data.</li>';
//         });
// }

// function focusShop(lat, lon) {
//     map.setView([lat, lon], 17, { animate: true });
// }

// function locateAndSearch() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             pos => {
//                 const lat = pos.coords.latitude;
//                 const lon = pos.coords.longitude;
//                 map.setView([lat, lon], 14);

//                 if (userMarker) map.removeLayer(userMarker);
//                 userMarker = L.circleMarker([lat, lon], {
//                     radius: 8,
//                     fillColor: 'red',
//                     color: '#fff',
//                     weight: 1,
//                     opacity: 1,
//                     fillOpacity: 0.9
//                 }).addTo(map).bindPopup("You are here").openPopup();

//                 getNearbyShops(lat, lon);
//             },
//             err => {
//                 alert("Could not get location. Using default location (Ahmedabad).");
//                 getNearbyShops(23.0305, 72.5649);
//             }
//         );
//     } else {
//         alert("Geolocation not supported. Using default location.");
//         getNearbyShops(23.0305, 72.5649);
//     }
// }

// locateAndSearch();

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