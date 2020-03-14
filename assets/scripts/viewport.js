const minWidth = 375
const viewportEl = document.querySelector('meta[name="viewport"]')
const mediaQueryList = window.matchMedia(`(min-device-width: ${minWidth}px)`)

function handleChange() {
  const viewportContent = mediaQueryList.matches
    ? 'width=device-width, initial-scale=1'
    : `width=${minWidth}`

  viewportEl.setAttribute('content', viewportContent)
}

mediaQueryList.addListener(handleChange)
handleChange()
