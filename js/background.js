chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	changeUa(message)
})

async function changeUa(newUa) {
	if (!newUa) return

	// 重置ua
	if (newUa === "reset") {
		const rules = await chrome.declarativeNetRequest.getDynamicRules()
		const newRules = {
			removeRuleIds: rules.map((rule) => rule.id),
		}

		chrome.declarativeNetRequest.updateDynamicRules(newRules, () => {
			if (chrome.runtime.lastError) {
				console.log(chrome.runtime.lastError)
				return
			}
			chrome.tabs.reload()
		})

		return
	}

	// 设置ua
	const rule = {
		id: 2,
		priority: 2,
		action: {
			type: "modifyHeaders",
			requestHeaders: [
				{
					header: "user-agent",
					operation: "set",
					value: newUa,
				},
			],
		},
		condition: {
			urlFilter: "*",
			resourceTypes: ["main_frame", "xmlhttprequest"],
		},
	}

	const newRules = {
		addRules: [rule],
		removeRuleIds: [rule.id],
	}

	chrome.declarativeNetRequest.updateDynamicRules(newRules, () => {
		if (chrome.runtime.lastError) {
			console.log(chrome.runtime.lastError)
			return
		}
		chrome.tabs.reload()
	})
}
