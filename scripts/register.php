<?php
header('Content-Type: text/plain');
$conn = new mysqli("localhost", "root", "", "TechnoPharms");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
$email = $conn->real_escape_string($data["email"]);
$password = password_hash($data["password"], PASSWORD_DEFAULT);

// Check if email already exists
$check = $conn->query("SELECT id FROM shopkeepers WHERE email = '$email'");
if ($check->num_rows > 0) {
    echo "This email is already registered.";
    exit;
}

$sql = "INSERT INTO shopkeepers (email, password) VALUES ('$email', '$password')";
if ($conn->query($sql)) {
    echo "Registration successful!";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
