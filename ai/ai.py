import sys
import urllib.parse
import urllib.request

def main():
    if len(sys.argv) < 2:
        print("用法：python ai.py 你的问题")
        return
    msg = sys.argv[1]

    msg_enc = urllib.parse.quote(msg)
    url = f"https://api.52vmy.cn/api/chat/glm?msg={msg_enc}&type=text"

    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as res:
            result = res.read().decode("utf-8")
            print(result)
    except Exception as e:
        print(f"请求失败：{e}")

if __name__ == "__main__":
    main()
