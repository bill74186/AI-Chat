#!/bin/sh
urlencode() {
    _str="$1"
    printf "%s" "$_str" | od -An -t x1 | tr -s '[:space:]' '\n' | awk '
    BEGIN {
        safe_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_~.-"
    }
    {
        hex = $1
        char = sprintf("%c", strtonum("0x" hex))
        if (index(safe_chars, char) > 0) {
            printf "%s", char
        } else {
            printf "%%%02X", strtonum("0x" hex)
        }
    }
    ' | tr -d '\n'
}
if [ $# -lt 1 ]; then
    echo "[*]Usage: $0 [question]"
    echo "[*]使用方法: sh $0 [你的问题]"
    exit 1
fi
question="$*"
enc_q=$(urlencode "$question")
api="https://api.52vmy.cn/api/chat/glm?msg=${enc_q}&type=text"
result=$(curl -s "$api")
printf "\n===== AI Chat =====\n%s\n\n" "$result"
