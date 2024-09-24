import { GM_registerMenuCommand } from "$";
import { waitElement } from "@1natsu/wait-element";
import { search_results_filter } from "./search";
import { topic_callback, topic_filter_immediately } from "./topic";
import { create_settings_ui, create_topic_ui } from "./ui";
import { create_observer, listenToUrlChanges } from "./utils";

GM_registerMenuCommand("设置", create_settings_ui);

const url = window.location.href;
if (url.startsWith("https://github.com/topics")) {
	window.topic_nums = 0;
	window.topic_repo = [];
	const target = await waitElement(".topic");
	await waitElement(".site-subnav");
	create_topic_ui();
	topic_filter_immediately(target);
	create_observer(target, topic_callback);
}

listenToUrlChanges(async (url) => {
	if (url.startsWith("https://github.com/search")) {
		window.search_nums = 0;
		const target = await waitElement(".search-results-page");
		search_results_filter(target);
	}
});
