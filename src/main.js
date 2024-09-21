// eslint-disable-next-line camelcase
// import { GM_getValue, GM_setValue, GM_addStyle, GM_notification } from '$'

import { GM_log } from '$'

const target = document.querySelector('.topic')
console.log('Mutation:')

const filterWords = ['leetcode', 'LeetCode']

const config = { childList: true, subtree: true }

const callback = function (mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(node => {
          topic_article(node)
        })
      }
    }
  }
}

function hasFilterWord (text) {
  for (let i = 0; i < filterWords.length; i++) {
    const word = filterWords[i]
    if (text.includes(word)) {
      return true
    }
  }
  return false
}

function topic_article(dom) {
  if (dom.nodeName == 'ARTICLE') {
    const h3 = dom.querySelector('h3')
    if (!h3) return

    const alinks = h3.querySelectorAll('a')
    let a_text = []
    alinks.forEach(link => {
      const txt = link.textContent.replace(/\s+/g, '').trim();
      a_text.push(txt)
    });

    const text = a_text.join('/')
    const has = hasFilterWord(text)
    if (has) {
      dom.style.display = 'none'
    }
  }
}

const observer = new MutationObserver(callback)
if (target) {
  observer.observe(target, config)
} else {
  console.log('.topic 元素不存在')
}