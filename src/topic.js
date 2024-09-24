import {
	get_filter_words_arr,
	hasFilterWord,
	hasKeyWords,
	hasRepo,
} from "./utils.js";

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
	show_filter_number();
}

function topic_article(dom) {
	const h3 = dom.querySelector("h3");
	if (!h3) return;

	const alinks = h3.querySelectorAll("a");
	if (alinks.length !== 2) return;

	const repo = alinks[1].textContent.replace(/\s+/g, "").trim();
	const author = alinks[0].textContent.replace(/\s+/g, "").trim();
	const authorAndRepo = `${author}/${repo}`;
	if (repo === undefined || author || undefined) return;

	const KeyWords = get_filter_words_arr("KeyWords");
	const has_key = hasKeyWords(repo, KeyWords);
	if (has_key) {
		dom.style.display = "none";
		++window.topic_nums;
		window.topic_repo.push(authorAndRepo);
		return;
	}

	const AuthorWords = get_filter_words_arr("AuthorWords");
	const has_author = hasFilterWord(author, AuthorWords);
	if (has_author) {
		dom.style.display = "none";
		++window.topic_nums;
		window.topic_repo.push(authorAndRepo);
		return;
	}

	const RepoWords = get_filter_words_arr("RepoWords");
	const has_repo = hasRepo(authorAndRepo, RepoWords);
	if (has_repo) {
		dom.style.display = "none";
		++window.topic_nums;
		window.topic_repo.push(authorAndRepo);
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
	show_filter_number();
}

function show_filter_number() {
	const num_a = document.getElementById("hly_num");
	if (!num_a) return;
	num_a.textContent = `过滤 ${window.topic_nums} 个仓库`;
}
