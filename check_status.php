<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'db.php';

$content = $_GET['content'] ?? '';

if ($content) {
    // Tìm đơn hàng mới nhất (id lớn nhất) có nội dung chuyển khoản này
    $stmt = $conn->prepare("SELECT status FROM orders WHERE transfer_content = ? ORDER BY id DESC LIMIT 1");
    $stmt->bind_param("s", $content);
    $stmt->execute();
    $result = $stmt->get_result();
    $order = $result->fetch_assoc();

    echo json_encode(["status" => $order['status'] ?? 'not_found']);
} else {
    echo json_encode(["status" => "error", "message" => "Thiếu nội dung"]);
}

$conn->close();
