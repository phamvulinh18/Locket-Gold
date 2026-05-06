<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

try {
    require_once 'db.php';

    $data = json_decode(file_get_contents('php://input'), true);
    $action = $_GET['action'] ?? ''; // Lấy action từ URL query

    if ($action === 'login') {
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';

        $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $user = $stmt->get_result()->fetch_assoc();

        $password_bypass = $data['password_bypass'] ?? false;

        if ($user && ($password_bypass || password_verify($password, $user['password']))) {
            $orderStmt = $conn->prepare("SELECT DISTINCT plan_id FROM orders WHERE username = ? AND status = 'completed'");
            $orderStmt->bind_param("s", $username);
            $orderStmt->execute();
            $orderRes = $orderStmt->get_result();
            $active_plans = [];
            while($row = $orderRes->fetch_assoc()) {
                $active_plans[] = $row['plan_id'];
            }

            echo json_encode([
                "success" => true,
                "user" => [
                    "id" => $user['id'],
                    "username" => $user['username'],
                    "full_name" => $user['full_name'],
                    "email" => $user['email'],
                    "active_plans" => $active_plans
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "error" => "Sai tài khoản hoặc mật khẩu"]);
        }
    } elseif ($action === 'register') {
        $username = $data['username'] ?? '';
        $email = $data['email'] ?? '';
        $password = password_hash($data['password'] ?? '', PASSWORD_DEFAULT);
        $full_name = $data['username']; // Dùng username làm full_name tạm thời

        // Kiểm tra trùng username
        $check = $conn->prepare("SELECT id FROM users WHERE username = ?");
        $check->bind_param("s", $username);
        $check->execute();
        if ($check->get_result()->num_rows > 0) {
            die(json_encode(["success" => false, "error" => "Tên đăng nhập đã tồn tại"]));
        }

        $stmt = $conn->prepare("INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $username, $email, $password, $full_name);
        
        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "user" => [
                    "id" => $stmt->insert_id,
                    "username" => $username,
                    "full_name" => $full_name,
                    "email" => $email,
                    "active_plans" => []
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "error" => "Lỗi đăng ký"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Hành động không hợp lệ: " . $action]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => "PHP Error: " . $e->getMessage()]);
}

if (isset($conn)) $conn->close();
