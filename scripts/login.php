<?php
session_start();
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "TechnoPharms");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB connection failed."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$email = $conn->real_escape_string($data["email"]);
$password = $conn->real_escape_string($data["password"]);

// Fetch user
$sql = "SELECT id, password FROM shopkeepers WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    // Plain text comparison
    if ($password === $user["password"]) {
        $_SESSION["shopkeeper_id"] = $user["id"];
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Incorrect password."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Email not found."]);
}
$conn->close();
?>
