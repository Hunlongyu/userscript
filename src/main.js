// eslint-disable-next-line camelcase
import { GM_addStyle, GM_log } from '$'

const css = `
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
try {
  GM_addStyle(css)
} catch (e) {
  GM_log(new Error('GM_addStyle stopped working！'))
}
