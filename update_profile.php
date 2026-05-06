<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['username'])) {
    die(json_encode(["success" => false, "message" => "Thiếu dữ liệu"]));
}

$username = $data['username'];
$full_name = $data['full_name'] ?? '';
$email = $data['email'] ?? '';
$phone = $data['phone'] ?? '';
$avatar = $data['avatar'] ?? '';

try {
    $stmt = $conn->prepare("UPDATE users SET full_name = ?, email = ?, phone = ?, avatar = ? WHERE username = ?");
    $stmt->bind_param("sssss", $full_name, $email, $phone, $avatar, $username);
    
    if ($stmt->execute()) {
        // Lấy lại thông tin user mới
        $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $user = $stmt->get_result()->fetch_assoc();
        
        // Lấy lại danh sách gói cước
        $orderStmt = $conn->prepare("SELECT DISTINCT plan_id FROM orders WHERE username = ? AND status = 'completed'");
        $orderStmt->bind_param("s", $username);
        $orderStmt->execute();
        $orders = $orderStmt->get_result();
        $active_plans = [];
        while($row = $orders->fetch_assoc()) { $active_plans[] = $row['plan_id']; }
        $user['active_plans'] = $active_plans;

        echo json_encode(["success" => true, "message" => "Cập nhật thành công", "user" => $user]);
    } else {
        echo json_encode(["success" => false, "message" => "Cập nhật thất bại"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}

$conn->close();
