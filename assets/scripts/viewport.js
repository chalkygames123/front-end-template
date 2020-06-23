const el = document.querySelector('meta[name="viewport"]')
const mql = window.matchMedia('(min-device-width: 375px)')
const handleChange = () => {
  el.setAttribute(
    'content',
    mql.matches ? 'width=device-width, initial-scale=1' : 'width=375'
  )
}

handleChange()

mql.addListener(handleChange)
