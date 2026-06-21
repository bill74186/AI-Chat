import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

public class ai {
    public static void main(String[] args) {
        if (args.length < 1) {
            System.out.println("用法：java ai 你的问题");
            return;
        }
        try {
            String msg = args[0];
            String msgEncode = URLEncoder.encode(msg, "UTF-8");
            String apiUrl = "https://api.52vmy.cn/api/chat/glm?msg=" + msgEncode + "&type=text";

            URL url = new URL(apiUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }
            br.close();
            conn.disconnect();

            System.out.println(sb);
        } catch (Exception e) {
            System.out.println("请求出错：" + e.getMessage());
        }
    }
}
