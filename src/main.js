// eslint-disable-next-line camelcase
import { GM_addStyle } from '$'

const sites = [
  {
    name: 'baidu',
    css: `
      #header{display:none !important;}
      .trans-domain-btn{display: none !important;}
      .ai-trans-btn{display: none !important;}
      .manual-trans-btn{display: none !important;}
      .collection-btn{display: none !important;}
      .op-trans-fb{display: none !important;}
      #app-read{display: none !important;}
      .footer{display: none !important;}
      .note-expand-btn{display: none !important;}
      .trans-other-right{display: none;}
      .app-guide{display: none !important;}
      .desktop-guide-wrapper{display: none !important;}
      `
  },
  {
    name: 'iciba',
    css: `
      nav{display: none !important;}
      [class^="translate_header"] ul:nth-child(2){display: none !important;}
      `
  },
  {
    name: 'google',
    css: `
      .app-download-bar, #gb{display: none !important;}
      `
  },
  {
    name: 'youdao',
    css: `
      .top, .banner, .footer, .sticky-sidebar{
        display:none !important;
      }
      .tab-header{
        display:none !important;
      }
      .index{
        background: url("") !important;
      }
      `
  },
  {
    name: 'bing',
    css: `
      .desktop_header, .desktop_header_menu, #b_footer{display: none !important;}
      #tt_translatorHome{width: 96% !important;}
      `
  },
  {
    name: 'sogou',
    css: `
      .translate-pc-header, .header-pc, .trans-type, .img-banner, .footer-pc{display: none !important;}
      .trans-box{margin-top: 20px;}
      `
  },
  {
    name: 'deepl',
    css: `
      [data-testid="dl-footer"], [data-testid="write-promo-banner"], [data-testid="pro_ad_content"], [data-testid="app_banner_content"],
      [data-testid="dl-header"], aside, #cookieBanner{
        display: none !important;
      }
      `
  }
]

const url = window.location.href
for (let i = 0; i < sites.length; i++) {
  if (url.includes(sites[i].name)) {
    GM_addStyle(sites[i].css)
    break
  }
}
