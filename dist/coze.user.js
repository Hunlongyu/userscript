// ==UserScript==
// @name               『小助手』COZE - Free GPT4
// @name:zh-CN         『小助手』COZE - 免费GPT4
// @namespace          ttps://github.com/Hunlongyu
// @version            0.8.4
// @author             Hunlongyu
// @description        Hide the left Prompt panel and the middle Skills panel with just one click, and expand the chat panel.
// @description:zh-CN  一键隐藏左侧 Prompt 面板 和中间 Skills 面板，扩大聊天面板。
// @license            MIT
// @copyright          Copyright (c) [2024] [hunlongyu]
// @icon               https://i.loli.net/2019/04/22/5cbd720718fdb.png
// @homepage           https://github.com/Hunlongyu/userscript
// @supportURL         https://github.com/Hunlongyu/userscript/issues
// @match              *://www.coze.com/*
// @grant              GM_addStyle
// @grant              GM_getValue
// @grant              GM_notification
// @grant              GM_registerMenuCommand
// @grant              GM_setValue
// @grant              GM_unregisterMenuCommand
// @run-at             document-end
// ==/UserScript==

(function () {
  'use strict';

  var _GM_addStyle = /* @__PURE__ */ (() => typeof GM_addStyle != "undefined" ? GM_addStyle : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_notification = /* @__PURE__ */ (() => typeof GM_notification != "undefined" ? GM_notification : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_unregisterMenuCommand = /* @__PURE__ */ (() => typeof GM_unregisterMenuCommand != "undefined" ? GM_unregisterMenuCommand : void 0)();
  const cssExpand = `
        html{
            min-width: 600px !important;
        }
        body{
            min-width: 600px !important;
        }
        .sidesheet-container{
            grid-template-columns: 0 0 1fr !important;
        }
        .nXeOwsObZZQToAlSP5Kx{
            display: none !important;
        }
    `;
  const cssShrink = `
        .sidesheet-container{
            grid-template-columns: 13fr 13fr 14fr !important;
        }
        .nXeOwsObZZQToAlSP5Kx{
            display: "";
        }
    `;
  const buttonExpand = `
        <button id="button_expand" style="margin-left: 10px;" class="semi-button semi-button-primary" type="button" aria-disabled="false"><span class="semi-button-content" x-semi-prop="children">展开</span></button>
    `;
  const buttonShrink = `
        <button id="button_shrink" style="margin-left: 10px; display: none;" class="semi-button semi-button-primary" type="button" aria-disabled="false"><span class="semi-button-content" x-semi-prop="children">恢复</span></button>
    `;
  const task = () => {
    let parentFlag = false;
    let textareaFlag = false;
    const timer = setInterval(() => {
      const parent = document.querySelector(".semi-spin-children");
      if (parent) {
        const firstChild = parent.children[0];
        if (firstChild && !parentFlag) {
          firstChild.insertAdjacentHTML("beforeend", buttonExpand);
          firstChild.insertAdjacentHTML("beforeend", buttonShrink);
          toggleHandle();
          parentFlag = true;
        }
      }
      const textareas = document.querySelectorAll(".semi-input-textarea-wrapper");
      if (textareas) {
        const lastTextarea = textareas[textareas.length - 1];
        if (lastTextarea && !textareaFlag) {
          const style = window.getComputedStyle(lastTextarea);
          const maxHeight = style.getPropertyValue("max-height");
          if (maxHeight === "78px") {
            lastTextarea.style.maxHeight = "300px";
          }
          textareaFlag = true;
        }
      }
      if (parentFlag && textareaFlag) {
        if (!_GM_getValue("is_expand")) {
          _GM_setValue("is_expand", false);
        } else {
          _GM_addStyle(cssExpand);
          leftRightPadding();
          document.querySelector("#button_expand").style.display = "none";
          document.querySelector("#button_shrink").style.display = "";
        }
        clearInterval(timer);
      }
    }, 500);
  };
  const toggleHandle = () => {
    const btnExpand = document.querySelector("#button_expand");
    btnExpand.addEventListener("click", () => {
      _GM_addStyle(cssExpand);
      document.querySelector("#button_expand").style.display = "none";
      document.querySelector("#button_shrink").style.display = "";
    });
    const btnShrink = document.querySelector("#button_shrink");
    btnShrink.addEventListener("click", () => {
      _GM_addStyle(cssShrink);
      document.querySelector("#button_expand").style.display = "";
      document.querySelector("#button_shrink").style.display = "none";
    });
  };
  let expandId = null;
  const registerExpandId = () => {
    if (expandId)
      _GM_unregisterMenuCommand(expandId);
    expandId = _GM_registerMenuCommand(`${_GM_getValue("is_expand") ? "✅" : "❌"}${_GM_getValue("is_expand") ? "已开启自动展开功能（点击关闭）" : "已关闭自动展开功能（点击打开）"}`, () => {
      if (_GM_getValue("is_expand") === true) {
        _GM_setValue("is_expand", false);
        _GM_notification({ text: "已关闭自动展开功能", timeout: 3500, onclick: function() {
          location.reload();
        } });
      } else {
        _GM_setValue("is_expand", true);
        _GM_notification({ text: "已开启自动展开功能", timeout: 3500, onclick: function() {
          location.reload();
        } });
      }
      registerExpandId();
    });
  };
  registerExpandId();
  let paddingPx = null;
  const registerPaddingPxId = () => {
    if (paddingPx)
      _GM_unregisterMenuCommand(paddingPx);
    paddingPx = _GM_registerMenuCommand(`${_GM_getValue("px_padding") > 0 ? "✅" : "❌"}${_GM_getValue("px_padding") > 0 ? "已开启留白（像素）: " + _GM_getValue("px_padding") + "px" : "已关闭留白（像素）: 0px"}`, () => {
      const px = prompt("请输入，面板左右留白的像素值。");
      if (px === "" || px === null || px <= 0 || Number(px) <= 0) {
        _GM_setValue("px_padding", 0);
        _GM_notification({ text: "无效数值", timeout: 3500, onclick: function() {
          location.reload();
        } });
        _GM_addStyle(".sidesheet-container{padding: 0px !important;}");
      } else {
        _GM_setValue("px_padding", Number(px));
        _GM_notification({ text: "已开启留白（像素）: " + px + "px", timeout: 3500, onclick: function() {
          location.reload();
        } });
        _GM_addStyle(`.sidesheet-container{padding: 0 ${px}px !important;}`);
        if (_GM_getValue("pe_padding") > 0) {
          _GM_setValue("pe_padding", 0);
          registerPaddingPeId();
        }
        if (!_GM_getValue("is_expand")) {
          _GM_setValue("is_expand", true);
          registerExpandId();
        }
      }
      registerPaddingPxId();
    });
  };
  registerPaddingPxId();
  let paddingPe = null;
  const registerPaddingPeId = () => {
    if (paddingPe)
      _GM_unregisterMenuCommand(paddingPe);
    paddingPe = _GM_registerMenuCommand(`${_GM_getValue("pe_padding") > 0 ? "✅" : "❌"}${_GM_getValue("pe_padding") > 0 ? "已开启留白（百分比）: " + _GM_getValue("pe_padding") + "%" : "已关闭留白（百分比）: 0%"}`, () => {
      let pe = prompt("请输入，面板左右留白的百分比值。");
      if (pe === "" || pe === null || pe <= 0 || Number(pe) <= 0) {
        _GM_setValue("pe_padding", 0);
        _GM_notification({ text: "无效数值", timeout: 3500, onclick: function() {
          location.reload();
        } });
        _GM_addStyle(".sidesheet-container{padding: 0 !important;}");
      } else {
        if (Number(pe) >= 50) {
          pe = 49;
        }
        _GM_setValue("pe_padding", Number(pe));
        _GM_notification({ text: "已开启留白（百分比）: " + pe + "%", timeout: 3500, onclick: function() {
          location.reload();
        } });
        _GM_addStyle(`.sidesheet-container{padding: 0 ${pe}% !important;}`);
        if (_GM_getValue("px_padding") > 0) {
          _GM_setValue("px_padding", 0);
          registerPaddingPxId();
        }
        if (!_GM_getValue("is_expand")) {
          _GM_setValue("is_expand", true);
          registerExpandId();
        }
      }
      registerPaddingPeId();
    });
  };
  registerPaddingPeId();
  function leftRightPadding() {
    if (_GM_getValue("pe_padding") > 0) {
      _GM_addStyle(`.sidesheet-container{padding: 0 ${_GM_getValue("pe_padding")}% !important;}`);
      return;
    }
    if (_GM_getValue("px_padding") > 0) {
      _GM_addStyle(`.sidesheet-container{padding: 0 ${_GM_getValue("px_padding")}px !important;}`);
    }
  }
  function registerEventHandler(target) {
    return function registerTargetEventHandler(methodName) {
      const originMethod = target[methodName];
      return function eventHandler(...args) {
        const event = new Event(methodName.toLowerCase());
        originMethod.apply(target, args);
        window.dispatchEvent(event);
        return originMethod;
      };
    };
  }
  const registerHistoryEventHandler = registerEventHandler(window.history);
  window.history.pushState = registerHistoryEventHandler("pushState");
  function main() {
    const url = window.location.href;
    const botReg = /^https:\/\/www\.coze\.com\/.*\/bot\/.*$/;
    if (botReg.test(url)) {
      task();
    }
    const exploreReg = /^https:\/\/www\.coze\.com\/explore\/.*$/;
    if (exploreReg.test(url)) {
      task();
    }
  }
  window.addEventListener("pushstate", main, false);
  main();

})();