import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      server: { mountGmApi: true },
      entry: 'src/main.js',
      userscript: {
        name: {
          '': '『小助手』Zotero - Github Readme',
          'zh-CN': '『小助手』Zotero - Github Readme'
        },
        description: {
          '': '',
          'zh-CN': '一键保存 Github Readme.md 到 Zotero'
        },
        icon: 'https://i.loli.net/2019/04/22/5cbd720718fdb.png',
        namespace: 'ttps://github.com/Hunlongyu',
        copyright: 'Copyright (c) [2025] [hunlongyu]',
        homepage: 'https://github.com/Hunlongyu/userscript',
        license: 'MIT',
        match: ['*://github.com/*'],
      },
    }),
  ],
});
