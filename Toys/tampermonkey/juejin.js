// ==UserScript==
// @name         IJueJin
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @run-at       document-end
// @match        https://juejin.cn/post/*
// @icon         https://juejin.cn/favicons/favicon-32x32.png
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  function beautify() {
    const style = document.createElement('style')
    const text = `
  #juejin .main-container { max-width: 80vw !important}
  #juejin .main-container .main-area { width: calc(100% - 20rem - 16px)}
  #juejin .main-container .main-area .article-hero { max-width: 500px }
  `
    style.appendChild(document.createTextNode(text))

    const head = document.getElementsByTagName('head')[0]
    head.appendChild(style)
    console.info('insert style')

    const dom = document.querySelector('.extension')
    if (dom) dom.parentElement.removeChild(dom)
  }
  beautify()
})()
