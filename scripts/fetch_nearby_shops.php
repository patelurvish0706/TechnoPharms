<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "TechnoPharms");
if ($conn->connect_error) {
    echo json_encode([]);
    exit;
}

function haversine($lat1, $lon1, $lat2, $lon2) {
    $R = 6371; // Earth radius in KM
    $dLat = deg2rad($lat2 - $lat1);
    $dLon = deg2rad($lon2 - $lon1);
    $a = sin($dLat / 2) * sin($dLat / 2) +
         cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
         sin($dLon / 2) * sin($dLon / 2);
    $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
    return $R * $c;
}

$userLat = isset($_GET['lat']) ? floatval($_GET['lat']) : 23.0305;
$userLon = isset($_GET['lon']) ? floatval($_GET['lon']) : 72.5649;
$maxDistanceKm = 3.0; // ← LIMIT HERE

$sql = "SELECT * FROM techshops";
$result = $conn->query($sql);
$nearby = [];

if ($result && $result->num_rows > 0) {
    while ($shop = $result->fetch_assoc()) {
        $distance = haversine($userLat, $userLon, $shop['shop_latitude'], $shop['shop_longitude']);
        if ($distance <= $maxDistanceKm) {
            $shop['distance'] = round($distance, 2);
            $nearby[] = $shop;
        }
    }
}

// Sort by nearest
usort($nearby, fn($a, $b) => $a['distance'] <=> $b['distance']);

echo json_encode($nearby);
$conn->close();
?>
