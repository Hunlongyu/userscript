// ==UserScript==
// @name               『净网卫士』百度翻译
// @name:zh-CN         『净网卫士』百度翻译
// @namespace          ttps://github.com/Hunlongyu
// @version            0.2.1
// @author             Hunlongyu
// @description        Block ads on Baidu's translation interface, streamline pages, and optimize layout.
// @description:zh-CN  页面精简，去除广告，只保留主要功能的部分。
// @license            MIT
// @copyright          Copyright (c) [2024] [hunlongyu]
// @icon               https://i.loli.net/2019/04/22/5cbd720718fdb.png
// @homepageURL        https://github.com/Hunlongyu/userscript
// @supportURL         https://github.com/Hunlongyu/userscript/issues
// @match              *://fanyi.baidu.com/*
// @grant              GM_addStyle
// @grant              GM_log
// @run-at             document-start
// ==/UserScript==

(function () {
  'use strict';

  var _GM_addStyle = /* @__PURE__ */ (() => typeof GM_addStyle != "undefined" ? GM_addStyle : void 0)();
  var _GM_log = /* @__PURE__ */ (() => typeof GM_log != "undefined" ? GM_log : void 0)();
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
  `;
  try {
    _GM_addStyle(css);
  } catch (e) {
    _GM_log(new Error("GM_addStyle stopped working！"));
  }

})();