<?php
$msg = $_GET["msg"] ?? implode(' ', array_slice($_SERVER['argv'], 1)) ?? null;
if (empty($msg)) {
    echo "[*]Usage: php ai.php [question]\n";
    echo "[*]使用方法: php ai.php [你的问题]\n";
    exit;
}
$msg = urlencode($msg);
$url = "https://api.52vmy.cn/api/chat/glm?msg={$msg}&type=text";
$result = file_get_contents($url);
echo "\n===== AI Chat =====\n$result\n\n";
?>
