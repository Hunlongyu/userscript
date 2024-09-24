import { get_filter_words_arr, hasFilterWord, hasKeyWords } from "./utils.js";

export function topic_callback(mutationList, _observer) {
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
	const KeyWords = get_filter_words_arr("KeyWords");

	const h3 = dom.querySelector("h3");
	if (!h3) return;

	const alinks = h3.querySelectorAll("a");
	if (alinks.length !== 2) return;

	const repo = alinks[1].textContent.replace(/\s+/g, "").trim();
	const has_key = hasKeyWords(repo, KeyWords);
	if (has_key) {
		dom.style.display = "none";
		return;
	}

	const author = alinks[0].textContent.replace(/\s+/g, "").trim();
	const has_author = hasFilterWord(author, AuthorFilterWords);
	if (has_author) {
		dom.style.display = "none";
		return;
	}

	const authorAndRepo = `${author}/${repo}`;
	const has_repo = hasRepo(authorAndRepo, RepositoryFilterWords);
	if (has_repo) {
		dom.style.display = "none";
		return;
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
