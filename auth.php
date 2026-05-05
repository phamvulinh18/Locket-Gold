<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(); }

require_once 'db.php'; // Sử dụng file kết nối chung

$data = json_decode(file_get_contents('php://input'), true);
$action = $_GET['action'] ?? '';

if ($action == 'register') {
    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $data['username'], $data['email'], $hashedPassword, $data['username']);
    if ($stmt->execute()) echo json_encode(["success" => true]);
    else echo json_encode(["success" => false, "error" => "Tài khoản đã tồn tại"]);
}

if ($action == 'login') {
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $data['username'], $data['username']);
    $stmt->execute();
    $user = $stmt->get_result()->fetch_assoc();
    if ($user && password_verify($data['password'], $user['password'])) {
        unset($user['password']);
        echo json_encode(["success" => true, "user" => $user]);
    } else {
        echo json_encode(["success" => false, "error" => "Sai tài khoản hoặc mật khẩu"]);
    }
}
$conn->close();
