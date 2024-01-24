// eslint-disable-next-line camelcase
import { GM_addStyle } from '$'

const parseUrl = () => {
  const url = window.location.href
  if (url.includes('123pan')) {
    runWith123Pan()
  } else if (url.includes('lanzou')) {
    runWithLanzou()
  } else if (url.includes('quark')) {
    runWithQuark()
  } else if (url.includes('baidu')) {
    runWithBaidu()
  } else if (url.includes('aliyundrive')) {
    runWithAliYun()
  } else if (url.includes('ghpym')) {
    runWithGhpym()
  }
}

const runWith123Pan = () => {
  const css = `
    .mfy-main-layout__head{display: none !important;}
    .banner-container-pc{display: none !important;}
    /* 手机 */
    .banner-container-h5{display: none !important;}
  `
  GM_addStyle(css) // 隐藏推广
  localStorage.setItem('linearModal', '"off"') // 隐藏弹框
}

const runWithLanzou = () => {
  const css = `
    .foot_info{display: none !important;}
  `
  GM_addStyle(css)
}

const runWithQuark = () => {
  const css = `
    .feature-screen{display: none !important;}
    [class^="DetailLayout--header-wrap"]{display: none !important;}
    .share-right-side-content{display: none !important;}
    [class^="CommonFooter--footer"]{display: none !important;}
    #ice-container{background-color: #f3f6fe;}
    [class^="DetailLayout--content"]{width: 90% !important; max-width: 1280px;}
  `
  GM_addStyle(css)
}

const runWithBaidu = () => {
  const css = `
    .module-sidebar-business-ad{display: none !important;}
    #bd-main .bd-left{margin: 0 !important;}
    .module-share-footer{display: none !important;}
  `
  GM_addStyle(css)
}

const runWithAliYun = () => {
  const css = `
    [class^="share-list-banner"]{display: none !important;}
  `
  GM_addStyle(css)
}

const runWithGhpym = () => {
  const css = `
    [class^="share-list-banner"]{display: none !important;}
    footer{display: none !important;}
    .search-box{display: none !important;}
    `
  GM_addStyle(css)
}

parseUrl()
