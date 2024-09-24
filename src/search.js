import { get_filter_words_arr, hasFilterWord, hasKeyWords } from "./utils.js";

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

	const repo = vec[1];
	const has_key = hasKeyWords(repo, KeyWords);
	if (has_key) {
		dom.style.display = "none";
		return;
	}

	const author = vec[0];
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
