import {
	get_filter_words_arr,
	hasAuthor,
	hasKeyWords,
	hasRepo,
} from "./utils.js";

export function search_results_filter(dom) {
	const target = dom.querySelector('[data-testid="results-list"]');
	if (!target) return;

	const divs = target.children;
	if (divs.length <= 0) return;

	for (let i = 0; i < divs.length; ++i) {
		const div = divs[i];
		check_search_item(div);
	}

	show_filter_number();
}

function check_search_item(dom) {
	const item = dom.querySelector(".search-match");
	if (!item) return;

	const text = item.textContent;
	const vec = text.trim().split("/");

	const repo = vec[1];
	if (repo === undefined) return;
	const KeyWords = get_filter_words_arr("KeyWords");
	const has_key = hasKeyWords(repo, KeyWords);
	if (has_key) {
		dom.style.display = "none";
		window.search_nums++;
		return;
	}

	const author = vec[0];
	if (author === undefined) return;
	const AuthorWords = get_filter_words_arr("AuthorWords");
	const has_author = hasAuthor(author, AuthorWords);
	if (has_author) {
		dom.style.display = "none";
		window.search_nums++;
		return;
	}

	const authorAndRepo = `${author}/${repo}`;
	const RepoWords = get_filter_words_arr("RepoWords");
	const has_repo = hasRepo(authorAndRepo, RepoWords);
	if (has_repo) {
		dom.style.display = "none";
		window.search_nums++;
		return;
	}
}

function show_filter_number() {
	const parent = document.querySelector(".dafPaR");
	if (!parent) return;

	const num = document.createElement("span");
	num.style.fontSize = "12px";
	num.style.marginLeft = "10px";
	parent.appendChild(num);

	const search_num = window.search_nums;
	num.textContent = `过滤数量：${search_num}`;
}
