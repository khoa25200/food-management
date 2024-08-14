/* eslint-disable no-unused-vars */
import { getComponentFromElement } from './Helper'

const useScroll = () => {
  const scroll = ({ dataScroll, heightScroll = 0, custom = false }) => {
    if (!dataScroll && !custom) return
    if (custom) {
      window.scrollTo(0, 0)
      return
    }

    const el = document.querySelector(dataScroll)
    const vEl = getComponentFromElement(el)

    if (vEl) {
      const top = vEl.offsetTop
      window.scrollTo({ top: top - heightScroll, behavior: 'smooth' })
    } else if (el && el.offsetTop) {
      window.scrollTo({ top: el.offsetTop - heightScroll, behavior: 'smooth' })
    }
  }

  return scroll
}

export { useScroll }
