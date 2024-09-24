import Swal from "sweetalert2";
import {
	add_filter_words,
	get_filter_words_arr,
	hasAuthor,
	hasKeyWords,
	hasRepo,
} from "./utils.js";

import { create_add_filter_ui } from "./ui.js";

export function search_results_filter(dom) {
	const target = dom.querySelector('[data-testid="results-list"]');
	if (!target) return;

	const divs = target.children;
	if (divs.length <= 0) return;

	for (let i = 0; i < divs.length; ++i) {
		const div = divs[i];
		check_search_item(div);
		avatar_add_handle(div);
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

function avatar_add_handle(dom) {
	const avatar = dom.querySelector("[data-testid=github-avatar]");
	if (!avatar) return;
	avatar.style.cursor = "pointer";
	avatar.addEventListener("click", async () => {
		const res = await create_add_filter_ui();

		const item = dom.querySelector(".search-match");
		if (!item) return;
		const text = item.textContent;
		const vec = text.trim().split("/");
		const author = vec[0];
		const repo = vec[1];
		const authorAndRepo = `${author}/${repo}`;

		let flag = -1;
		if (res === "author") {
			flag = add_filter_words("AuthorWords", author);
		}
		if (res === "repo") {
			flag = add_filter_words("RepoWords", authorAndRepo);
		}
		if (flag === -1) return;
		const toast = Swal.mixin({
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
		});
		if (flag) {
			toast.fire({
				icon: "success",
				title: "添加成功",
			});
			if (res === "author") {
				document.location.reload();
			}
			if (res === "repo") {
				check_search_item(dom);
			}
		} else {
			toast.fire({
				icon: "warning",
				title: "添加失败, 已存在",
			});
		}
	});
}
