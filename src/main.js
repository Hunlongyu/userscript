// eslint-disable-next-line camelcase
import { GM_addStyle, GM_log } from '$'

const css = `
    .MMqloUXF{display:none !important;}
    .ZqJhu4sT{display:none !important;}
    .UzOvH9bK{display:none !important;}
    .Hu5qsRSB{display:none !important;}
    .qphmPPyw{display:none !important;}
    .tk4FR4Cn{display:none !important;}
    .rfhEM3lg{display:none !important;}

    #header{display:none !important;}
    .nav-dxy-logo{display:none !important;}
    #app-read{display:none !important;}
    .footer{display:none !important;}
    .trans-domain-btn{display:none !important;}
    .trans-btn-zh{display:none !important;}
    .ai-trans-btn{display:none !important;}
    .manual-trans-btn{display:none !important;}
  `
try {
  GM_addStyle(css)
} catch (e) {
  GM_log(new Error('GM_addStyle stopped working！'))
}
