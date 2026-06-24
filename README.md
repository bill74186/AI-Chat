<div align="center">

# AI Chat

Free Multi-Model AI Chat Tool

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=font-awesome&logoColor=white)](https://fontawesome.com/)
[![Marked.js](https://img.shields.io/badge/Marked.js-000000?style=for-the-badge&logo=markdown&logoColor=white)](https://marked.js.org/)

**English** | [简体中文](README.zh.cn.md) | [繁體中文](README.zh.tw.md)

<p>
  <a href="https://github.com/bill74186/AI-Chat/stargazers"><img src="https://img.shields.io/github/stars/bill74186/AI-Chat?style=for-the-badge&logo=github&color=f4c542" alt="Stars"></a>
  <a href="https://github.com/bill74186/AI-Chat/network/members"><img src="https://img.shields.io/github/forks/bill74186/AI-Chat?style=for-the-badge&logo=github&color=6cc644" alt="Forks"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License"></a>
</p>

</div>

## Introduction

AI Chat is a **free online AI chat tool** developed by **bill74186**. It supports Spark, GLM, and Quark large language models, featuring custom AI system role, dark mode, Markdown rendering, and fully responsive design for mobile and desktop.

> [!tip]
> The terminal version is now basically stable, while the web version is still under development. Feel free to open an issue if you have any suggestions!

## Features

- 🤖 **Multi-Model Support**: Spark, GLM, Quark large language models
- 🌐 **Multi-Language Interface**: English, Simplified Chinese, Traditional Chinese
- 🎭 **Custom AI Role**: Set a global AI system persona
- 🌙 **Dark Mode**: Light and dark theme toggle
- 📝 **Markdown Rendering**: Code highlighting, tables, lists, etc.
- 📱 **Responsive Design**: Fully adapts to all devices

## Live Demo

| Language | Link |
|----------|------|
| English | https://bill74186.github.io/AI-Chat/index.html |
| 简体中文 | https://bill74186.github.io/AI-Chat/zh.cn.html |
| 繁體中文 | https://bill74186.github.io/AI-Chat/zh.tw.html |
| Simple Version | https://bill74186.github.io/AI-Chat/web/chat.html |
| Painting Version | https://bill74186.github.io/AI-Chat/web/draw.html |

## Supported Models

- **GLM**: Zhipu AI LLM
- **Spark**: iFlytek Spark LLM
- **Quark**: Quark LLM
- **Draw**:  AI painting LLM
- **More**: More models coming soon!

## Tech Stack

- **Frontend**: HTML5 + CSS3 + JavaScript
- **Icons**: Font Awesome 6.4.0
- **Markdown**: marked.js
- **API**: Custom backend interface

## Multi-Language Clients

The project provides client implementations in multiple programming languages, located in the `ai/` directory:

| Language | File | Usage |
|----------|------|-------|
| Python | `ai.py` | Command-line client |
| Node.js | `ai.js` | Interactive terminal |
| PHP | `ai.php` | Web / CLI dual mode |
| Java | `ai.java` | Java command-line |
| C | `ai.c` | C language client |
| Shell | `ai.sh` | Shell script |
| HTML | `ai.html` | Standalone webpage |

All terminal clients can be used with `command your_question` format, for example:

```bash
python ai.py Hello
php ai.php Who are you
```

> [!note]
> Note: The Node.js client uses an interactive chat mode, recommended for use!

## Quick Start

```bash
# Clone the project
git clone https://github.com/bill74186/AI-Chat.git

# Enter the directory
cd AI-Chat

# Start a local server
python -m http.server 8000
# Or use serve
npx serve

# Visit http://localhost:8000
```

## Project Structure

```
AI-Chat/
├── index.html      # English main page
├── zh.cn.html      # Simplified Chinese page
├── zh.tw.html      # Traditional Chinese page
├── script.js       # Main page script
├── style.css       # Stylesheet
├── ai/             # Multi-language client directory
│   ├── ai.py
│   ├── ai.js
│   ├── ai.php
│   ├── ai.java
│   ├── ai.c
│   ├── ai.sh
│   ├── ai.html
│   └── README.md
├── favicon.ico     # Website favicon
└── LICENSE         # MIT License
```

## Usage Notes

1. AI-generated content is for reference only; use your independent judgment
2. Do not enter sensitive personal information or private data
3. Different models have different capabilities; switch based on your scenario
4. This project is still in testing and development; please report any bugs

## License

This project is released under the MIT License. See [LICENSE](LICENSE) for details.

> (Note: During testing, AI models were found to have inaccurate time perception. You can define the time in the system role settings)<br>
> If you don't love it, please don't hurt it. If you love it, please give it a Star!
