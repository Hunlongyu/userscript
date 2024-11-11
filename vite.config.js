import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.js',
      userscript: {
        name: {
          '': '『Game Helper』超级乌龟',
          'zh-CN': '『游戏助手』超级乌龟'
        },
        description: {
          'en': 'change the number of items by mouse wheel',
          'zh-CN': '鼠标滚动修改物品数量'
        },
        icon: 'https://i.loli.net/2019/04/22/5cbd720718fdb.png',
        namespace: 'ttps://github.com/Hunlongyu',
        copyright: 'Copyright (c) [2024] [hunlongyu]',
        homepage: 'https://github.com/Hunlongyu/userscript',
        license: 'MIT',
        match: [
          'https://gltyx.github.io/super-turtle-idle/*'
        ],
        'run-at': 'document-end',
        supportURL: 'https://github.com/Hunlongyu/userscript/issues'
      }
    })
  ]
})
