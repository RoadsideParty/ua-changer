chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message === "custom") {
		const customUa = prompt("自定义ua")
		sendResponse(customUa)
	}
})
