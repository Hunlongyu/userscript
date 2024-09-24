import { GM_getValue, GM_setValue } from "$";

export function hasAuthor(text, filterWords) {
	if (text.length === 0) return;
	for (let i = 0; i < filterWords.length; i++) {
		const word = filterWords[i];
		if (word.length === 0) continue;
		if (text.includes(word)) {
			return true;
		}
	}
	return false;
}

export function hasKeyWords(text, filterWords) {
	if (text.length === 0) return;
	const txt = text.toUpperCase();
	for (let i = 0; i < filterWords.length; i++) {
		const word = filterWords[i].toUpperCase();
		if (word.length === 0) continue;
		if (txt.includes(word)) {
			return true;
		}
	}
	return false;
}

export function hasRepo(text, filterWords) {
	if (text.length === 0) return;
	for (let i = 0; i < filterWords.length; i++) {
		const word = filterWords[i];
		if (word.length === 0) continue;
		if (text === word) {
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

export function add_filter_words(type, txt) {
	const arr = get_filter_words_arr(type);
	if (arr.includes(txt)) {
		return false;
	}
	arr.push(txt);
	const json = JSON.stringify(arr);
	GM_setValue(type, json);
	return true;
}

function debounce(fn, delay) {
	let timer = null;
	return (...args) => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			fn(...args);
			timer = null;
		}, delay);
	};
}

export function listenToUrlChanges(callback) {
	const originalPushState = history.pushState;
	const originalReplaceState = history.replaceState;

	history.pushState = function (...args) {
		originalPushState.apply(this, args);
		window.dispatchEvent(new Event("pushstate"));
		window.dispatchEvent(new Event("locationchange"));
	};

	history.replaceState = function (...args) {
		originalReplaceState.apply(this, args);
		window.dispatchEvent(new Event("replacestate"));
		window.dispatchEvent(new Event("locationchange"));
	};

	window.addEventListener("popstate", () => {
		window.dispatchEvent(new Event("locationchange"));
	});

	const debouncedCallback = debounce(callback, 200);

	window.addEventListener("locationchange", () => {
		debouncedCallback(window.location.href);
	});
}
