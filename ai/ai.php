<?php
$msg = $_GET["msg"] ?? $_SERVER['argv'][1] ?? null;
if (empty($msg)) {
    echo "请输入提问内容，示例：ai 你是谁\n";
    exit;
}
$msg = urlencode($msg);
$url = "https://api.52vmy.cn/api/chat/glm?msg={$msg}&type=text";
echo file_get_contents($url) . "\n";
?>
