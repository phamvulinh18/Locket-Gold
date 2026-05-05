<?php
// Tắt chế độ ném ngoại lệ để xử lý lỗi thủ công
mysqli_report(MYSQLI_REPORT_OFF);

$host = "127.0.0.1"; 
$user = "root";
$pass = ""; 
$dbname = "locketgold";
$port = 3307; 

$conn = @new mysqli($host, $user, $pass, $dbname, $port);

if ($conn->connect_error) {
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    echo json_encode(["success" => false, "error" => "MySQL Error: " . $conn->connect_error]);
    exit();
}
