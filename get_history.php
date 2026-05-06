<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'db.php';

$user_id = $_GET['user_id'] ?? '';

if (!$user_id) {
    die(json_encode(["success" => false, "message" => "Thiếu user_id"]));
}

try {
    $stmt = $conn->prepare("SELECT id, plan_id, amount, status, created_at, transfer_content FROM orders WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $history = [];
    while($row = $result->fetch_assoc()) {
        $history[] = $row;
    }

    echo json_encode(["success" => true, "data" => $history]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}

$conn->close();
