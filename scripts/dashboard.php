<?php
session_start();

// Prevent caching in browser
header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
header("Pragma: no-cache"); // HTTP 1.0.
header("Expires: 0"); // Proxies

// If not logged in, redirect to login
if (!isset($_SESSION['shopkeeper_id']) || empty($_SESSION['shopkeeper_id'])) {
    header("Location: ../login.html");
    exit;
}


$shopkeeper_id = $_SESSION['shopkeeper_id'];
$host = 'localhost';
$db = 'TechnoPharms';
$user = 'root';
$pass = ''; // Replace with your DB password
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

// Fetch existing data
$sql = "SELECT * FROM techshops WHERE shopkeeper_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $shopkeeper_id);
$stmt->execute();
$result = $stmt->get_result();
$shopData = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html>
<head>
  <title>Shopkeeper Dashboard</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <link rel="stylesheet" href="../styles/style.css">
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
      
      .formcontainer{
        font-family: "Montserrat", sans-serif;
        /* width: 60vw; */
        display: flex;
        justify-content: center;
        margin:0 auto 100px;
      }

      #theform{
        width: 70%;
        display:flex;
        flex-direction: column;
        gap:5px;
      }

      #map{
        width: 100% ;
        height : 300px;
      }

      button,input{
        padding:6px 10px;
        font-size:17px;
        letter-spacing:1px;
      }

      button,label{
        margin-top:10px;
      }

      textarea{
        padding:6px 10px;
        letter-spacing:1px;
        font-family: "Montserrat", sans-serif;
        font-size:17px;
        height:150px;
      }

      input,textarea,button{
        border:transparent;
        border-radius:5px;
        box-shadow:0px 0px 3.5px #0004;
        cursor: pointer;
      }

      button{
        color:#fff;
        background-color: #5630ffc1;
      }
      
      button:hover{
        background-color: #5630ffe7;
      }
    </style>
</head>
<body>
      <nav>
        <div class="logo">
            <img src="../src/logo2.avif" alt="" srcset="" id="imgLogo" loading="lazy">Techno Pharms
        </div>
        <div class="buttons">
            <div class="navButton " id="Home">Welcome, Shopkeeper</div>
            <div class="navButton activePage" id="Logout" onclick="logout()">Logout</div>
        </div>
    </nav>

    <div class="sapLine"></div>

    <div class="formcontainer">

    <form id="theform" action="update_shop.php" method="POST">
        <label for="shopkeeper_name">Your Name</label>
        <input type="text" name="shopkeeper_name" id="shopkeeper_name" required value="<?= htmlspecialchars($shopData['shopkeeper_name'] ?? '') ?>">

        <label for="contact_number">Contact Number</label>
        <input type="tel" name="contact_number" id="contact_number" required value="<?= htmlspecialchars($shopData['contact_number'] ?? '') ?>">

        <label for="shop_name">Shop Name</label>
        <input type="text" name="shop_name" id="shop_name" required value="<?= htmlspecialchars($shopData['shop_name'] ?? '') ?>">

        <label for="shop_time">Shop Timing</label>
        <input type="text" name="shop_time" id="shop_time" value="<?= htmlspecialchars($shopData['shop_time'] ?? '') ?>">

        <label for="shop_description">Description</label>
        <textarea name="shop_description" id="shop_description"><?= htmlspecialchars($shopData['shop_description'] ?? '') ?></textarea>

        <h3>Select Shop Location on Map</h3>
        <div id="map"></div>

        <label for="shop_latitude">Shop Latitude</label>
        <input type="number" name="shop_latitude" id="shop_latitude" step="any" required readonly value="<?= htmlspecialchars($shopData['shop_latitude'] ?? '') ?>">

        <label for="shop_longitude">Shop Longitude</label>
        <input type="number" name="shop_longitude"  id="shop_longitude" step="any" required readonly value="<?= htmlspecialchars($shopData['shop_longitude'] ?? '') ?>">

        <button type="submit" onclick="alert(`Your Data is Successfully Update.🎉`)">Save Shop Info</button>
    </form>

   </div>

    <script>
        let map, marker;
        function initMap() {
            const latInput = document.getElementById('shop_latitude');
            const lonInput = document.getElementById('shop_longitude');

            let lat = parseFloat(latInput.value) || 20.5937;
            let lon = parseFloat(lonInput.value) || 78.9629;
            let zoom = (latInput.value && lonInput.value) ? 16 : 5;

            map = L.map('map').setView([lat, lon], zoom);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            if (latInput.value && lonInput.value) {
                marker = L.marker([lat, lon]).addTo(map);
            }

            map.on('click', function(e) {
                latInput.value = e.latlng.lat.toFixed(7);
                lonInput.value = e.latlng.lng.toFixed(7);
                if (marker) {
                    marker.setLatLng(e.latlng);
                } else {
                    marker = L.marker(e.latlng).addTo(map);
                }
            });

            if (!latInput.value) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((pos) => {
                        const coords = [pos.coords.latitude, pos.coords.longitude];
                        map.setView(coords, 16);
                        marker = L.marker(coords).addTo(map);
                        latInput.value = coords[0].toFixed(7);
                        lonInput.value = coords[1].toFixed(7);
                    });
                }
            }
        }
        window.onload = initMap;
    
      function logout() {
          document.getElementById('theform').innerHTML = `<label>You Are Logged Out.</label>`;
          // Redirect to logout.php which destroys the session
          window.location.href = 'logout.php';
      }
    </script>
</body>
</html>
