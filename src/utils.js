export function hasFilterWord(text, filterWords) {
	for (let i = 0; i < filterWords.length; i++) {
		const word = filterWords[i];
		if (text.includes(word)) {
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
