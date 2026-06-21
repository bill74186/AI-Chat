const readline = require('readline');
const fetchPromise = import('node-fetch');

const YELLOW = '\033[33m';
const RESET = '\033[0m';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `${YELLOW}你> ${RESET}`
});
rl.pause();
console.log('===== \033[33mAI Chat终端对话工具\033[0m =====');
console.log('输入消息对话，输入 exit 退出\n');
rl.resume();
rl.prompt();

function typeWrite(text, delay = 15) {
  return new Promise((resolve) => {
	let index = 0;
	process.stdout.write(`\r${YELLOW}AI> ${RESET}`);
	const timer = setInterval(() => {
	  if (index < text.length) {
		process.stdout.write(text.charAt(index));
		index++;
	  } else {
		clearInterval(timer);
		process.stdout.write(`${RESET}\n\n`);
		resolve();
	  }
	}, delay);
  });
}

async function sendMessage(msg) {
  process.stdout.write(`\r${YELLOW}AI> ${RESET}正在思考中...`);
  const { default: fetch } = await fetchPromise;
  const url = `https://api.52vmy.cn/api/chat/glm?msg=${encodeURIComponent(msg)}`;
  try {
	const res = await fetch(url);
	const data = await res.json();
	const rawMd = data.data?.answer ?? '抱歉，由于限制，请稍后再试';
	await typeWrite(rawMd);
  } catch (err) {
	process.stdout.write(`\r${YELLOW}AI> ${RESET}网络或接口出错，请重试\n\n`);
  }
}

rl.on('line', async (inputRaw) => {
  const content = inputRaw.trim();
  rl.pause();
  if (content.toLowerCase() === 'exit') {
	rl.close();
	return;
  }
  if (content) {
	await sendMessage(content);
  }
  rl.resume();
  rl.prompt();
}).on('close', () => {
  console.log('对话结束');
  process.exit(0);
});