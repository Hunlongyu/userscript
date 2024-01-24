import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.js',
      userscript: {
        name: {
          '': '『净网卫士』网盘净化',
          'zh-CN': '『净网卫士』网盘净化'
        },
        description: {
          '': 'Block advertisements, pop ups, promotions, shopping malls, etc',
          'zh-CN': '屏蔽广告、弹框、推广、商场等'
        },
        icon: 'https://i.loli.net/2019/04/22/5cbd720718fdb.png',
        namespace: 'userscript.hunlongyu.dev',
        match: [
          'https://www.123pan.com/*',
          'https://*.lanzoul.com/*',
          'https://*.lanzouo.com/*',
          'https://pan.quark.cn/*',
          'https://pan.baidu.com/*',
          'https://www.aliyundrive.com/*',
          'http://ct.ghpym.com/*'
        ],
        grant: ['GM_addStyle'],
        'run-at': 'document-start'
      }
    })
  ]
})
