'use strict';
import { insertZoteroButton, buttonExists, getReadmeContent } from './github'
import { ping, saveItems } from "./zotero";

function btnClick() {
  const txt = getReadmeContent();
  if (txt) {
    const url = window.location.href;
    const title = document.title;
    if (!ping()) {
      return;
    }
    const res = saveItems({
      uri: url,
      items: [{
        notes: [txt],
        tags: ['Github', 'README'],
        url: url,
        title: title,
      }]
    })
    if (res.success) {
      console.log('success');
    }
  }
}

try {
  if (document.readyState === 'complete') {
    insertZoteroButton(btnClick);
  } else {
    window.addEventListener('DOMContentLoaded', insertZoteroButton(btnClick));
  }
  const observer = new MutationObserver(function (mutations) {
    if (!buttonExists()) {
      insertZoteroButton(btnClick);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
  });
}
catch (error) {
  console.error(error);
}