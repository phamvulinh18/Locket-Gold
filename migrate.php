<?php
require_once 'db.php';
try {
    $conn->query("ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(20)");
    $conn->query("ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar LONGTEXT");
    echo "Cập nhật Database thành công!";
} catch (Exception $e) {
    echo "Lỗi: " . $e->getMessage();
}
$conn->close();
?>
