chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	changeUa(message)
})

async function changeUa(newUa) {
	if (!newUa) return
	if (newUa === "reset") {
		const rules = await chrome.declarativeNetRequest.getDynamicRules()
		const newRules = {
			removeRuleIds: rules.map((rule) => rule.id),
		}

		chrome.declarativeNetRequest.updateDynamicRules(newRules, () => {
			if (chrome.runtime.lastError) {
				console.log(chrome.runtime.lastError)
			}
		})

		return
	}

	let customUa = ""
	if (newUa === "custom") {
		const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
		customUa = await chrome.tabs.sendMessage(tab.id, "custom")
		if (!customUa) return
	}

	const ua = customUa ? customUa : newUa
	const rule = {
		id: 2,
		priority: 2,
		action: {
			type: "modifyHeaders",
			requestHeaders: [
				{
					header: "user-agent",
					operation: "set",
					value: ua,
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
		}
	})
}
