<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'db.php'; // Quan trọng: Phải có dòng này

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $stmt = $conn->prepare("INSERT INTO orders (username, plan_id, amount, transfer_content) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssis", $data['username'], $data['planId'], $data['amount'], $data['transferContent']);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "id" => $conn->insert_id]);
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
}
$conn->close();
