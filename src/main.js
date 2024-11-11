// eslint-disable-next-line camelcase
import {
  GM_getValue,
  GM_setValue,
  GM_addStyle,
  GM_unregisterMenuCommand,
  GM_registerMenuCommand,
  GM_notification,
} from "$";

import { create_ui } from "./ui";

function getItem(e) {
  const target = e.target;
  if (!target) return;
  if (target.tagName !== "IMG") return;
  const id = target.getAttribute("id");
  if (!id) return;
  const itemName = id.replace(/ItemImage$/, "");
  if (!itemName) return;
  let items = window.items;
  if (!items) return;
  let item = items[itemName];
  return item;
}

// 鼠标滚动修改物品数量
function wheelEventHandler(e) {
  if (!e.shiftKey) return;
  let item = getItem(e);
  if (!item) return;
  let count = parseInt(item.count);
  if (e.deltaY < 0) {
    count += 1;
  } else {
    count -= 1;
  }
  item.count = count;
}

// 解锁军械库
function unlockArmory(e) {
  const id = e.target.id;
  if (!id.includes('armory')) return;
  const itemName = id.replace(/armory$/, "");
  window.items[itemName].count = 1;
  let src = e.target.src.replace('I0', itemName);
  e.target.src = src;
  e.target.style = "fileter: grayscale(0)";
}


function onMouseUpHandler(e) {
  if (e.button === 1) { // 中键修改物品数量
    let item = getItem(e);
    if (!item) return;
    create_ui(item);
    window.autosave();
  }
  else if (e.button === 2) { // 右键解锁军械库
    console.log(e.target);
    unlockArmory(e)
  }
}

document.addEventListener("wheel", wheelEventHandler);
document.addEventListener("mouseup", onMouseUpHandler)
