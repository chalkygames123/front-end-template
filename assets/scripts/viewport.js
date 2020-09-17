const el = document.querySelector('meta[name="viewport"]')
const updateContent = ({ matches }) => {
  el.setAttribute('content', matches ? 'width=device-width' : 'width=375')
}
const mql = window.matchMedia('(min-device-width: 375px)')

mql.addListener(updateContent)
updateContent(mql)
