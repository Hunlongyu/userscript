import { GM_getValue, GM_setValue } from "$";

export function hasFilterWord(text, filterWords) {
	for (let i = 0; i < filterWords.length; i++) {
		const word = filterWords[i];
		if (text.includes(word)) {
			return true;
		}
	}
	return false;
}

export function hasKeyWords(text, filterWords) {
	const txt = text.toUpperCase();
	for (let i = 0; i < filterWords.length; i++) {
		const word = filterWords[i].toUpperCase();
		if (txt.includes(word)) {
			return true;
		}
	}
	return false;
}

export function hasRepo(text, filterWords) {
	const txt = text;
	for (let i = 0; i < filterWords.length; i++) {
		const word = filterWords[i];
		if (txt === word) {
			return true;
		}
	}
	return false;
}

export function create_observer(dom, callback) {
	const observer = new MutationObserver(callback);
	const config = { childList: true, subtree: true };
	observer.observe(dom, config);
}

export function get_filter_words(type) {
	const words = GM_getValue(type, "[]");
	const json = JSON.parse(words);
	const txt = json.join(",");
	return txt;
}

export function get_filter_words_arr(type) {
	const words = GM_getValue(type, "[]");
	const json = JSON.parse(words);
	return json;
}

export function set_filter_words(type, txt) {
	const arr = txt.split(",");
	const json = JSON.stringify(arr);
	GM_setValue(type, json);
}
