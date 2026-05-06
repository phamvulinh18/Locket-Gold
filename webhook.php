<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
file_put_contents("webhook_log.txt", print_r($data, true), FILE_APPEND);

if (!$data || !isset($data['content'])) {
    die(json_encode(["status" => "error", "message" => "Thiếu nội dung"]));
}

$content = $data['content']; // VD: "basic duykgin"
$amount = $data['amount'];
$parts = explode(' ', trim($content));

if (count($parts) < 2) {
    die(json_encode(["status" => "error", "message" => "Nội dung chuyển khoản không hợp lệ"]));
}

$plan_id = strtolower($parts[0]);
$username = $parts[1];

try {
    // 1. Tìm ID của user dựa trên username (Nối bảng)
    $userStmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $userStmt->bind_param("s", $username);
    $userStmt->execute();
    $user = $userStmt->get_result()->fetch_assoc();

    if (!$user) {
        die(json_encode(["status" => "error", "message" => "Không tìm thấy người dùng"]));
    }

    $user_id = $user['id'];

    // 2. Tạo đơn hàng với user_id chính xác
    $stmt = $conn->prepare("INSERT INTO orders (user_id, username, plan_id, amount, status, transfer_content) VALUES (?, ?, ?, ?, 'completed', ?)");
    $stmt->bind_param("issis", $user_id, $username, $plan_id, $amount, $content);
    
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Đã tạo đơn hàng cho user ID: $user_id"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Lỗi tạo đơn hàng"]);
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}

$conn->close();
