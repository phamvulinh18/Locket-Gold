<?php
// Bật thông báo lỗi để chúng ta nhìn thấy nguyên nhân thực sự
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$host = "127.0.0.1"; // Dùng IP để ép kết nối qua TCP
$user = "root";
$pass = ""; 
$dbname = "locketgold";
$port = 3307; 

try {
    $conn = new mysqli($host, $user, $pass, $dbname, $port);
} catch (mysqli_sql_exception $e) {
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    echo json_encode([
        "success" => false, 
        "error" => "MySQL Connection Failed",
        "detail" => $e->getMessage() // Trả về lỗi chi tiết từ MySQL
    ]);
    exit();
}
