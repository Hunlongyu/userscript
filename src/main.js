// eslint-disable-next-line camelcase
import { GM_getValue, GM_setValue, GM_addStyle, GM_unregisterMenuCommand, GM_registerMenuCommand, GM_notification } from '$'

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
    `
const cssShrink = `
        .sidesheet-container{
            grid-template-columns: 13fr 13fr 14fr !important;
        }
        .nXeOwsObZZQToAlSP5Kx{
            display: "";
        }
    `
const buttonExpand = `
        <button id="button_expand" style="margin-left: 10px;" class="semi-button semi-button-primary" type="button" aria-disabled="false"><span class="semi-button-content" x-semi-prop="children">展开</span></button>
    `
const buttonShrink = `
        <button id="button_shrink" style="margin-left: 10px; display: none;" class="semi-button semi-button-primary" type="button" aria-disabled="false"><span class="semi-button-content" x-semi-prop="children">恢复</span></button>
    `

// 执行网页净化功能
const task = () => {
  let parentFlag = false
  let textareaFlag = false
  const timer = setInterval(() => {
    const parent = document.querySelector('.semi-spin-children')
    if (parent) {
      const firstChild = parent.children[0]
      if (firstChild && !parentFlag) {
        firstChild.insertAdjacentHTML('beforeend', buttonExpand)
        firstChild.insertAdjacentHTML('beforeend', buttonShrink)
        toggleHandle()
        parentFlag = true
      }
    }

    const textareas = document.querySelectorAll('.semi-input-textarea-wrapper')
    if (textareas) {
      const lastTextarea = textareas[textareas.length - 1]
      if (lastTextarea && !textareaFlag) {
        const style = window.getComputedStyle(lastTextarea)
        const maxHeight = style.getPropertyValue('max-height')
        if (maxHeight === '78px') {
          lastTextarea.style.maxHeight = '300px'
        }
        textareaFlag = true
      }
    }

    if (parentFlag && textareaFlag) {
      if (!GM_getValue('is_expand')) {
        GM_setValue('is_expand', false)
      } else {
        GM_addStyle(cssExpand)
        document.querySelector('#button_expand').style.display = 'none'
        document.querySelector('#button_shrink').style.display = ''
      }
      clearInterval(timer)
    }
  }, 500)
}

// 展开 / 恢复 点击事件
const toggleHandle = () => {
  const btnExpand = document.querySelector('#button_expand')
  btnExpand.addEventListener('click', () => {
    GM_addStyle(cssExpand)
    document.querySelector('#button_expand').style.display = 'none'
    document.querySelector('#button_shrink').style.display = ''
  })

  const btnShrink = document.querySelector('#button_shrink')
  btnShrink.addEventListener('click', () => {
    GM_addStyle(cssShrink)
    document.querySelector('#button_expand').style.display = ''
    document.querySelector('#button_shrink').style.display = 'none'
  })
}

// 脚本菜单注册 / 及其交互
let menuExpandId = null
const registerMenuCommand = () => {
  if (menuExpandId) GM_unregisterMenuCommand(menuExpandId)
  menuExpandId = GM_registerMenuCommand(`${GM_getValue('is_expand') ? '✅' : '❌'}` + `${GM_getValue('is_expand') ? '已开启自动展开功能（点击关闭）' : '已关闭自动展开功能（点击打开）'}`, () => {
    if (GM_getValue('is_expand') === true) {
      GM_setValue('is_expand', false)
      GM_notification({ text: '已关闭自动展开功能', timeout: 3500, onclick: function () { location.reload() } })
    } else {
      GM_setValue('is_expand', true)
      GM_notification({ text: '已开启自动展开功能', timeout: 3500, onclick: function () { location.reload() } })
    }
    registerMenuCommand()
  })
}
registerMenuCommand()

// 用来完善 SPA 单页应用 url 变化但脚本不生效的问题
function registerEventHandler (target) {
  return function registerTargetEventHandler (methodName) {
    const originMethod = target[methodName]
    return function eventHandler (...args) {
      const event = new Event(methodName.toLowerCase())
      originMethod.apply(target, args)
      window.dispatchEvent(event)
      return originMethod
    }
  }
}

const registerHistoryEventHandler = registerEventHandler(window.history)
window.history.pushState = registerHistoryEventHandler('pushState')

function main () {
  const url = window.location.href
  const botReg = /^https:\/\/www\.coze\.com\/.*\/bot\/.*$/
  if (botReg.test(url)) {
    task()
  }
  const exploreReg = /^https:\/\/www\.coze\.com\/explore\/.*$/
  if (exploreReg.test(url)) {
    task()
  }
}
window.addEventListener('pushstate', main, false)
main()
