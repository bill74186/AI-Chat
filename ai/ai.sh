#!/data/data/com.termux/files/usr/bin/bash
# 定义URL编码函数
urlencode() {
    local s="$1"
    python3 -c "import urllib.parse; print(urllib.parse.quote('$s'))"
}

if [ $# -lt 1 ];then
    echo "用法：bash ai.sh 你的问题"
    exit 1
fi

msg="$1"
enc_msg=$(urlencode "$msg")
res=$(curl -s "https://api.52vmy.cn/api/chat/glm?msg=${enc_msg}&type=text")
echo "\n$res\n"