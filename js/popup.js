const options = [
	{
		label: "直接选择",
		value: "reset",
	},
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

const select = document.querySelector(".ua-changer")

const defaultUa = localStorage.getItem("defaultUa") || ""

for (const item of options) {
	const option = document.createElement("option")
	option.innerText = item.label
	option.setAttribute("value", item.value)
	if (item.value === defaultUa) {
		option.setAttribute("selected", true)
	}
	select.appendChild(option)
}

select.addEventListener("change", (e) => {
	const ua = e.target.value
	localStorage.setItem("defaultUa", ua)
	chrome.storage.local.set({ defaultUa: ua })
	sendContentMessage(ua)
})

async function sendContentMessage(newUa) {
	await chrome.runtime.sendMessage(newUa)
	// const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
	// await chrome.tabs.sendMessage(tab.id, newUa)
}
