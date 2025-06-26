// eslint-disable-next-line camelcase
import { GM_addStyle, GM_log } from '$'

const css = `
    .KxVKmLZM{display:none !important;}
    ._m6jE1Mj{display:none !important;}
    .RAbZsoLs{display:none !important;}
    .YGx8668_{display:none !important;}
    .h5JHRvHF{display:none !important;}
    .jygLSCYa{display:none !important;}
    .LxF9kyWA{display:none !important;}
    .Sp5qqVdz{display:none !important;}
    .XS9zPMly{display:none !important;}
    .sF3Yx_p0{display:none !important;}
    .qJU3axmS{display:none !important;}
    .dfAvRK2O{display:none !important;}
    .EUENIlUT{height: 100%; !important;}
    .UMjeGiEI{display:none !important;}
  `
try {
  GM_addStyle(css)
} catch (e) {
  GM_log(new Error('GM_addStyle stopped working！'))
}
