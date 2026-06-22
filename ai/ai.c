#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <curl/curl.h>

struct Memory {
    char *buffer;
    size_t length;
};

size_t write_callback(void *data, size_t size, size_t nmemb, void *mem) {
    struct Memory *m = (struct Memory *)mem;
    size_t total = size * nmemb;
    char *new_buf = realloc(m->buffer, m->length + total + 1);
    if (!new_buf) return 0;
    m->buffer = new_buf;
    memcpy(m->buffer + m->length, data, total);
    m->length += total;
    m->buffer[m->length] = '\0';
    return total;
}

char* url_encode(const char *str) {
    char *output = malloc(strlen(str) * 3 + 1);
    char *p = output;
    for (; *str != '\0'; str++) {
        if ((*str >= '0' && *str <= '9') ||
            (*str >= 'A' && *str <= 'Z') ||
            (*str >= 'a' && *str <= 'z') ||
            strchr("-_.~", *str)) {
            *p++ = *str;
        } else {
            sprintf(p, "%%%02X", (unsigned char)*str);
            p += 3;
        }
    }
    *p = '\0';
    return output;
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("[*]Usage：./ai [question]\n");
        printf("[*]用法：./ai [你的问题]\n");
        return 1;
    }

    CURL *curl;
    CURLcode ret;
    struct Memory res_data = {NULL, 0};

    char full_msg[512] = {0};
    for (int i = 1; i < argc; i++) {
        strcat(full_msg, argv[i]);
        strcat(full_msg, " ");
    }
    full_msg[strlen(full_msg) - 1] = '\0';

    char *msg_encode = url_encode(full_msg);
    char api_url[1024];
    snprintf(api_url, sizeof(api_url),
             "https://api.52vmy.cn/api/chat/glm?msg=%s&type=text",
             msg_encode);
    free(msg_encode);

    curl_global_init(CURL_GLOBAL_ALL);
    curl = curl_easy_init();
    if (!curl) {
        printf("[!]curl初始化失败\n");
        return 1;
    }

    curl_easy_setopt(curl, CURLOPT_URL, api_url);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &res_data);
    curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);

    ret = curl_easy_perform(curl);
    if (ret != CURLE_OK) {
        printf("[!]请求出错：%s\n", curl_easy_strerror(ret));
    } else {
        printf("\n===== AI Chat =====\n%s\n\n", res_data.buffer);
    }

    curl_easy_cleanup(curl);
    curl_global_cleanup();
    free(res_data.buffer);
    return 0;
}
