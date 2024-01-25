import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.js',
      userscript: {
        name: {
          '': '『小助手』COZE - Free GPT4',
          'zh-CN': '『小助手』COZE - 免费GPT4'
        },
        description: {
          '': 'Hide the left Prompt panel and the middle Skills panel with just one click, and expand the chat panel.',
          'zh-CN': '一键隐藏左侧 Prompt 面板 和中间 Skills 面板，扩大聊天面板。'
        },
        icon: 'https://i.loli.net/2019/04/22/5cbd720718fdb.png',
        namespace: 'ttps://github.com/Hunlongyu',
        copyright: 'Copyright (c) [2024] [hunlongyu]',
        homepageURL: 'https://github.com/Hunlongyu/userscript',
        license: 'MIT',
        match: [
          '*://www.coze.com/*'
        ],
        'run-at': 'document-end',
        supportURL: 'https://github.com/Hunlongyu/userscript/issues'
      }
    })
  ]
})
