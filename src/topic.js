import { GM_getValue } from "$";
import { hasFilterWord } from "./utils.js";

const _GM_Author = GM_getValue("AuthorFilterWords", "[]");
const AuthorFilterWords = JSON.parse(_GM_Author);

const _GM_Repository = GM_getValue("RepositoryFilterWords", "[]");

console.log(_GM_Repository);
const RepositoryFilterWords = JSON.parse(_GM_Repository);

export function topic_callback(mutationList, _observer) {
	if (AuthorFilterWords.length <= 0 && RepositoryFilterWords.length <= 0)
		return;
	if (mutationList.length <= 0) return;

	for (const mutation of mutationList) {
		if (mutation.type !== "childList") continue;
		if (mutation.addedNodes.length <= 0) continue;
		for (let i = 0; i < mutation.addedNodes.length; ++i) {
			const node = mutation.addedNodes[i];
			if (node.nodeName !== "ARTICLE") continue;
			topic_article(node);
		}
	}
}

function topic_article(dom) {
	const h3 = dom.querySelector("h3");
	if (!h3) return;

	const alinks = h3.querySelectorAll("a");
	if (alinks.length !== 2) return;

	const author = alinks[0].textContent.replace(/\s+/g, "").trim();
	const has_author = hasFilterWord(author, AuthorFilterWords);
	if (has_author) {
		dom.style.display = "none";
	}

	const repo = alinks[1].textContent.replace(/\s+/g, "").trim();
	const has_repo = hasFilterWord(repo, RepositoryFilterWords);
	if (has_repo) {
		dom.style.display = "none";
	}
}

export function topic_filter_immediately(dom) {
	const articles = dom.querySelectorAll("article");
	if (articles.length <= 0) return;

	for (let i = 0; i < articles.length; ++i) {
		const article = articles[i];
		topic_article(article);
	}
}
