<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'db.php';

$content = $_GET['content'] ?? '';
$stmt = $conn->prepare("SELECT status FROM orders WHERE transfer_content = ?");
$stmt->bind_param("s", $content);
$stmt->execute();
$result = $stmt->get_result();
$order = $result->fetch_assoc();

echo json_encode(["status" => $order['status'] ?? 'not_found']);
$conn->close();
