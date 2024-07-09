const items = [
	{
		label: "百度",
		value:
			"Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)",
	},
	{
		label: "神马",
		value:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e YisouSpider/5.0 Safari/602.1",
	},
	{
		label: "头条",
		value:
			"Mozilla/5.0 (compatible; Bytespider; https://zhanzhang.toutiao.com/) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.0.0 Safari/537.36",
	},
	{
		label: "360",
		value:
			"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36; 360Spider",
	},
	{
		label: "搜狗",
		value:
			"Sogou web spider/4.0(+http://www.sogou.com/docs/help/webmasters.htm#07)",
	},
	{
		label: "google",
		value:
			"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
	},
	{
		label: "bing",
		value:
			"Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) W.X.Y.Z Safari/537.36",
	},
	{
		label: "yandex",
		value: "Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)",
	},
	{
		label: "duckduckgo",
		value: "DuckDuckBot-Https/1.1; (+https://duckduckgo.com/duckduckbot)",
	},
]

const list = document.querySelector(".list")
const ipt = document.querySelector(".ipt")
const submitBtn = document.querySelector(".btn")
const resetBtn = document.querySelector(".btn.reset")

const currentUa = localStorage.getItem("currentUa") || ""

ipt.value = currentUa

for (const item of items) {
	const div = document.createElement("div")
	div.classList.add("item")
	div.innerText = item.label
	if (item.value === currentUa) {
		div.classList.add("active")
	}
	div.onclick = (e) => clickItem(e, item.value)
	list.appendChild(div)
}

// 清除item active样式
function resetItemActiveStyle() {
	Array.from(list.children).forEach((item) => {
		item.classList.remove("active")
	})
}

// 点击某一项
function clickItem(e, ua) {
	resetItemActiveStyle()
	e.target.classList.add("active")
	ipt.value = ua
}

// 点击确认按钮
submitBtn.onclick = function () {
	const ua = ipt.value
	if (!ua) return

	localStorage.setItem("currentUa", ua)
	sendContentMessage(ua)
}

// 点击重置按钮
resetBtn.onclick = function () {
	resetItemActiveStyle()
	ipt.value = ""
	localStorage.removeItem("currentUa")
	sendContentMessage("reset")
}

// 发送消息到background
async function sendContentMessage(newUa) {
	await chrome.runtime.sendMessage(newUa)
}
