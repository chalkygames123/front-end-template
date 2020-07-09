const el = document.querySelector('meta[name="viewport"]')
const mql = window.matchMedia('(min-device-width: 375px)')

const updateContent = (matches) => {
  el.setAttribute('content', matches ? 'width=device-width' : 'width=375')
}

updateContent(mql.matches)

const handleChange = (e) => {
  updateContent(e.matches)
}

mql.addListener(handleChange)
