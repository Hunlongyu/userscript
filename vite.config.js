import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		monkey({
			entry: "src/main.js",
			userscript: {
				name: {
					"": "『小助手』Github - filter library",
					"zh-CN": "『小助手』Github - 过滤库",
				},
				description: {
					"": "Hide unwanted libraries.",
					"zh-CN": "隐藏不想看到的库。",
				},
				icon: "https://i.loli.net/2019/04/22/5cbd720718fdb.png",
				namespace: "ttps://github.com/Hunlongyu",
				copyright: "Copyright (c) [2024] [hunlongyu]",
				homepage: "https://github.com/Hunlongyu/userscript",
				homepageURL: "https://github.com/Hunlongyu/userscript",
				license: "MIT",
				match: ["*://github.com/*"],
				"run-at": "document-end",
				supportURL: "https://github.com/Hunlongyu/userscript/issues",
			},
		}),
	],
});
