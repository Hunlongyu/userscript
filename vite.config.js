import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.js',
      userscript: {
        name: {
          '': '『小助手』腾讯微云 - 离线下载',
          'zh-CN': '『小助手』腾讯微云 - 离线下载'
        },
        description: {
          '': 'One click offline download, no need to click 2 steps.',
          'zh-CN': '一键离线下载，不需要点2步。'
        },
        icon: 'https://i.loli.net/2019/04/22/5cbd720718fdb.png',
        namespace: 'ttps://github.com/Hunlongyu',
        copyright: 'Copyright (c) [2024] [hunlongyu]',
        homepageURL: 'https://github.com/Hunlongyu/userscript',
        license: 'MIT',
        match: [
          '*://www.weiyun.com/*'
        ],
        'run-at': 'document-end',
        supportURL: 'https://github.com/Hunlongyu/userscript/issues'
      }
    })
  ]
})
