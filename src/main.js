const btButton = document.createElement('div')
btButton.innerHTML = `
<div class="action-item">
  <div class="action-item-con">
    <span class="act-txt">BT下载</span>
  </div>
</div>
`
btButton.setAttribute('class', 'mod-action-wrap clearfix')

btButton.addEventListener('click', () => {
  document.querySelectorAll('li.menu-item')[5].click()
  setTimeout(function () {
    document.querySelectorAll('.tab-nav-item')[0].click()
  }, 10)
})

const mgnetButton = document.createElement('div')
mgnetButton.innerHTML = `
<div class="action-item">
  <div class="action-item-con">
    <span class="act-txt">链接下载</span>
  </div>
</div>
`
mgnetButton.setAttribute('class', 'mod-action-wrap clearfix')

mgnetButton.addEventListener('click', () => {
  document.querySelectorAll('li.menu-item')[5].click()
  setTimeout(function () {
    document.querySelectorAll('.tab-nav-item')[1].click()
  }, 10)
  setTimeout(function () {
    document.querySelector('.input-block').focus()
  }, 20)
})

window.onload = () => {
  const nav = document.querySelector('.mod-nav')
  nav.appendChild(btButton)
  nav.appendChild(mgnetButton)
}
