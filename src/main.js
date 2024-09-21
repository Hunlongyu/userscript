// import { GM_setValue } from "$";
import { waitElement } from "@1natsu/wait-element";
import { search_results_filter } from "./search";
import { topic_callback, topic_filter_immediately } from "./topic";
import { create_observer } from "./utils";

// const vec = ["leetcode", "LeetCode", "Leetcode"];
// GM_setValue("RepositoryFilterWords", JSON.stringify(vec));

const url = window.location.href;
if (url.startsWith("https://github.com/topics")) {
	const target = await waitElement(".topic");
	create_observer(target, topic_callback);
	topic_filter_immediately(target);
} else if (url.startsWith("https://github.com/search")) {
	const target = await waitElement(".search-results-page");
	search_results_filter(target);
}
