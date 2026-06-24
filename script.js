let currentKey = localStorage.getItem("modelKey") || "glm";

function setActive(){
	document.querySelectorAll(".item[data-key]").forEach(el=>{
		el.classList.toggle("active", el.dataset.key === currentKey);
	})
}
setActive();

const list1 = document.getElementById("List1");
if(langOpen && list1){
	langOpen.addEventListener("click", ()=>{
		list1.classList.toggle("open");
	});
}

const list2 = document.getElementById("List2");
modelOpen.addEventListener("click", ()=>{
	list2.classList.toggle("open");
});
document.querySelectorAll(".item[data-key]").forEach(el=>{
	el.addEventListener("click", ()=>{
		currentKey = el.dataset.key;
		localStorage.setItem("modelKey", currentKey);
		setActive();
		list2.classList.remove("open");
	})
})

const list3 = document.getElementById("List3");
if(notesOpen && list3){
	notesOpen.addEventListener("click", ()=>{
		list3.classList.toggle("open");
	});
}

const menuBtn = document.getElementById("menuBtn");
const drop = document.getElementById("drop");
menuBtn.addEventListener("click", ()=>{
	drop.classList.toggle("show");
});
document.addEventListener("click", (e)=>{
	if(!menuBtn.contains(e.target) && !drop.contains(e.target)){
		drop.classList.remove("show");
		if(list1) list1.classList.remove("open");
		list2.classList.remove("open");
		if(list3) list3.classList.remove("open");
	}
})

const darkToggle = document.getElementById("darkToggle");
const body = document.body;
if(localStorage.getItem("darkMode") === "on"){
	body.classList.add("dark");
}
darkToggle.addEventListener("click", ()=>{
	body.classList.toggle("dark");
	const isDark = body.classList.contains("dark");
	localStorage.setItem("darkMode", isDark ? "on" : "off");
})

const setRoleBtn = document.getElementById("setRoleBtn");
setRoleBtn.addEventListener("click", ()=>{
	const oldRole = localStorage.getItem("customSystemRole") || "";
	const rolePrompt = document.body.dataset.rolePrompt || "Enter a custom global AI persona (clear and save to restore free conversation):";
	const roleCleared = document.body.dataset.roleCleared || "Global persona cleared. Restored free, unrestricted conversation.";
	const roleSaved = document.body.dataset.roleSaved || "Custom persona saved. It will apply automatically to future conversations.";
	const newRole = prompt(rolePrompt, oldRole);	if(newRole !== null){
		const trimRole = newRole.trim();
		if(trimRole === ""){
			localStorage.removeItem("customSystemRole");
			alert(roleCleared);
		}else{
			localStorage.setItem("customSystemRole", trimRole);
			alert(roleSaved);
		}
		drop.classList.remove("show");
	}
})

const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");

function sendMsg(){
	const text = input.value.trim();
	if(!text) return;
	chat.innerHTML += `<div class="msg user">${text}</div>`;
	input.value = "";
	const thinkText = document.body.dataset.think || "Thinking...";
	const errorText = document.body.dataset.error || "An error occurred, please try again later.";
	const aiTipText = document.body.dataset.tip || "AI-generated content is for reference only.";

	const think = document.createElement("div");
	think.className = "msg think";
	think.textContent = thinkText;
	chat.appendChild(think);
	window.scrollTo(0, document.body.scrollHeight);
	const systemRole = localStorage.getItem("customSystemRole") || "";
	const prompt = systemRole ? `${systemRole} ${text}` : text;
	fetch(`https://api.52vmy.cn/api/chat/${currentKey}?msg=${encodeURIComponent(prompt)}`)
		.then(res=>res.json())
		.then(data=>{
			const reply = data.data?.answer || errorText;
			think.remove();
			const aiBox = document.createElement("div");
			aiBox.className = "msg ai";
			aiBox.innerHTML = `<div class="tip">${aiTipText}</div>`;
			chat.appendChild(aiBox);
			let full = "", idx = 0;
			const type = setInterval(()=>{
				if(idx < reply.length){
					full += reply[idx];
					aiBox.innerHTML = `<div class="tip">${aiTipText}</div>` + marked.parse(full);
					window.scrollTo(0, document.body.scrollHeight);
					idx++;
				}else clearInterval(type);
			},10)
		})
		.catch(()=>{
			think.remove();
			chat.innerHTML += `<div class="msg ai">
				<div class="tip">${aiTipText}</div>
				${errorText}
			</div>`;
			window.scrollTo(0, document.body.scrollHeight);
		})
}
send.addEventListener("click", sendMsg);
input.addEventListener("keydown", e=>{
	if(e.key === "Enter" && !e.shiftKey){
		e.preventDefault();
		sendMsg();
	}
})