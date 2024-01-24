import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.js',
      userscript: {
        name: {
          '': '『净网卫士』在线翻译',
          'zh-CN': '『净网卫士』在线翻译'
        },
        description: {
          '': "Block ads on Baidu's translation interface, streamline pages, and optimize layout.",
          'zh-CN': '精简页面，移除广告，优化布局。适配：百度翻译、谷歌翻译、有道翻译、金山词霸、必应翻译、搜狗翻译、DeepL翻译。。'
        },
        icon: 'https://i.loli.net/2019/04/22/5cbd720718fdb.png',
        namespace: 'ttps://github.com/Hunlongyu',
        copyright: 'Copyright (c) [2024] [hunlongyu]',
        homepageURL: 'https://github.com/Hunlongyu/userscript',
        license: 'MIT',
        match: [
          '*://fanyi.baidu.com/*',
          '*://www.iciba.com/translate',
          '*://translate.google.com/*',
          '*://fanyi.youdao.com/*',
          '*://*.bing.com/translator*',
          '*://fanyi.sogou.com/*',
          '*://*.deepl.com/translator*',
          '*://*.deepl.com/*'
        ],
        'run-at': 'document-start',
        supportURL: 'https://github.com/Hunlongyu/userscript/issues'
      }
    })
  ]
})
