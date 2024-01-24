import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.js',
      userscript: {
        name: {
          '': '『净网卫士』百度翻译',
          'zh-CN': '『净网卫士』百度翻译'
        },
        description: {
          '': "Block ads on Baidu's translation interface, streamline pages, and optimize layout.",
          'zh-CN': '页面精简，去除广告，只保留主要功能的部分。'
        },
        icon: 'https://i.loli.net/2019/04/22/5cbd720718fdb.png',
        namespace: 'userscript.hunlongyu.dev',
        match: [
          '*://fanyi.baidu.com/*'
        ],
        'run-at': 'document-start',
        supportURL: 'https://github.com/Hunlongyu/userscript/issues'
      }
    })
  ]
})
