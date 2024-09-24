import Swal from "sweetalert2";
import { create_add_filter_ui } from "./ui.js";
import {
	add_filter_words,
	get_filter_words_arr,
	hasAuthor,
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
			svg_add_handle(node);
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
	if (repo === undefined || author === undefined) return;

	const KeyWords = get_filter_words_arr("KeyWords");
	const has_key = hasKeyWords(repo, KeyWords);
	if (has_key) {
		dom.style.display = "none";
		++window.topic_nums;
		window.topic_repo.push(authorAndRepo);
		return;
	}

	const AuthorWords = get_filter_words_arr("AuthorWords");
	const has_author = hasAuthor(author, AuthorWords);
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
		svg_add_handle(article);
	}
	show_filter_number();
}

function show_filter_number() {
	const num_a = document.getElementById("hly_num");
	if (!num_a) return;
	num_a.textContent = `过滤 ${window.topic_nums} 个仓库`;
}

function svg_add_handle(dom) {
	const svg = dom.querySelector("svg");
	if (!svg) return;
	svg.style.cursor = "pointer";
	svg.addEventListener("click", async () => {
		const res = await create_add_filter_ui();

		const h3 = dom.querySelector("h3");
		if (!h3) return;

		const alinks = h3.querySelectorAll("a");
		if (alinks.length !== 2) return;

		const repo = alinks[1].textContent.replace(/\s+/g, "").trim();
		const author = alinks[0].textContent.replace(/\s+/g, "").trim();
		const authorAndRepo = `${author}/${repo}`;
		if (repo === undefined || author === undefined) return;

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
			topic_article(dom);
		} else {
			toast.fire({
				icon: "warning",
				title: "添加失败, 已存在",
			});
		}
	});
}
