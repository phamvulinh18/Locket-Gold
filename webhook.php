<?php
header("Content-Type: application/json");
require_once 'db.php';

$SEPAY_API_KEY = "LOCKETGOLD_SECRET_2024";

// Lấy dữ liệu từ SePay
$data = json_decode(file_get_contents('php://input'), true);
$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? '';

if ($authHeader !== "Apikey $SEPAY_API_KEY") {
    die(json_encode(["error" => "Unauthorized"]));
}

if ($data && $data['transferType'] === 'in') {
    // Nội dung thực tế: "VIP1 vulinh FT26125393664896..."
    $content = $data['content']; 
    $amount = $data['transferAmount'];

    // LOG để kiểm tra (Bạn có thể xem file webhook_log.txt để debug)
    file_put_contents("webhook_log.txt", date("Y-m-d H:i:s") . " - Recv: $content - Amt: $amount\n", FILE_APPEND);

    // SQL: Tìm đơn hàng mà transfer_content nằm TRONG nội dung ngân hàng gửi về
    // Ví dụ: "VIP1 vulinh" nằm trong "VIP1 vulinh FT26125..."
    $stmt = $conn->prepare("UPDATE orders SET status = 'completed' WHERE ? LIKE CONCAT('%', transfer_content, '%') AND status = 'pending'");
    $stmt->bind_param("s", $content);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "Khớp đơn hàng thành công"]);
    } else {
        echo json_encode(["success" => false, "message" => "Không tìm thấy đơn hàng khớp với nội dung"]);
    }
}
$conn->close();
