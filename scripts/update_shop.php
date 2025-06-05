<?php
session_start();
if (!isset($_SESSION['shopkeeper_id'])) {
    header("Location: login.php");
    exit;
}

$shopkeeper_id = $_SESSION['shopkeeper_id'];
$host = 'localhost';
$db = 'TechnoPharms';
$user = 'root';
$pass = '';
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

$name = $_POST['shopkeeper_name'];
$number = $_POST['contact_number'];
$sname = $_POST['shop_name'];
$lat = $_POST['shop_latitude'];
$lon = $_POST['shop_longitude'];
$time = $_POST['shop_time'];
$desc = $_POST['shop_description'];

$stmt = $conn->prepare("SELECT id FROM techshops WHERE shopkeeper_id = ?");
$stmt->bind_param("i", $shopkeeper_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Update
    $stmt = $conn->prepare("UPDATE techshops SET shopkeeper_name=?, contact_number=?, shop_name=?, shop_latitude=?, shop_longitude=?, shop_time=?, shop_description=? WHERE shopkeeper_id=?");
    $stmt->bind_param("ssssddsi", $name, $number, $sname, $lat, $lon, $time, $desc, $shopkeeper_id);
} else {
    // Insert
    $stmt = $conn->prepare("INSERT INTO techshops (shopkeeper_id, shopkeeper_name, contact_number, shop_name, shop_latitude, shop_longitude, shop_time, shop_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isssddss", $shopkeeper_id, $name, $number, $sname, $lat, $lon, $time, $desc);
}

if ($stmt->execute()) {
    header("Location: dashboard.php");
} else {
    echo "Error: " . $stmt->error;
}
?>
