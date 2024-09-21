import { GM_getValue } from "$";
import { hasFilterWord } from "./utils.js";

const _GM_Author = GM_getValue("AuthorFilterWords", "[]");
const AuthorFilterWords = JSON.parse(_GM_Author);

const _GM_Repository = GM_getValue(
	"RepositoryFilterWords",
	'["hooks", "LeetCode"]',
);
const RepositoryFilterWords = JSON.parse(_GM_Repository);

export function search_results_filter(dom) {
	const target = dom.querySelector('[data-testid="results-list"]');
	if (!target) return;

	const divs = target.children;
	if (divs.length <= 0) return;

	for (let i = 0; i < divs.length; ++i) {
		const div = divs[i];
		check_search_item(div);
	}
}

function check_search_item(dom) {
	const item = dom.querySelector(".search-match");
	if (!item) return;

	const text = item.textContent;
	const vec = text.trim().split("/");

	const author = vec[0];
	const has_author = hasFilterWord(author, AuthorFilterWords);
	if (has_author) {
		dom.style.display = "none";
	}

	const repo = vec[1];
	const has_repo = hasFilterWord(repo, RepositoryFilterWords);
	if (has_repo) {
		dom.style.display = "none";
	}
}
