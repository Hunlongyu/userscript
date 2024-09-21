import { GM_addStyle, GM_getValue, GM_notificationtiGM_setValue } from "$";

import { waitElement } from "@1natsu/wait-element";

const target = document.querySelector(".topic");
console.log("Mutation:");

const filterWords = ["leetcode", "LeetCode"];

const config = { childList: true, subtree: true };

const callback = (mutationsList, observer) => {
	for (const mutation of mutationsList) {
		if (mutation.type === "childList") {
			if (mutation.addedNodes.length > 0) {
				for (node of mutation.addedNodes) {
					topic_article(node);
				}
			}
		}
	}
};

function hasFilterWord(text) {
	for (let i = 0; i < filterWords.length; i++) {
		const word = filterWords[i];
		if (text.includes(word)) {
			return true;
		}
	}
	return false;
}

function topic_article(dom) {
	if (dom.nodeName === "ARTICLE") {
		const h3 = dom.querySelector("h3");
		if (!h3) return;

		const alinks = h3.querySelectorAll("a");
		const a_text = [];
		for (link of alinks) {
			const txt = link.textContent.replace(/\s+/g, "").trim();
			a_text.push(txt);
		}

		const text = a_text.join("/");
		const has = hasFilterWord(text);
		if (has) {
			dom.style.display = "none";
		}
	}
}

const observer = new MutationObserver(callback);
if (target) {
	observer.observe(target, config);
} else {
	console.log(".topic 元素不存在");
}
