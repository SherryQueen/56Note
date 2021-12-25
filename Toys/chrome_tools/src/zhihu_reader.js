;(function () {
  document.querySelectorAll('.Post-NormalMain header').forEach((node) => (node.style.width = '80%'))
  document.querySelectorAll('.Post-NormalMain>div').forEach((node) => (node.style.width = '80%'))

  const style = document.createElement('style')
  style.type = 'text/css'
  style.rel = 'stylesheet'
  style.appendChild(
    document.createTextNode(`
    .Post-SideActions {
      left: -9999999px !important;
    }
  `)
  )
  document.getElementsByTagName('head')[0].appendChild(style)
})()
