import { isString } from 'lodash'

export function getUrlParams() {
  const params = {}
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    params[key] = value
  })
  return params
}

export function createUrlParams(path, params) {
  const query = Object.keys(params)
    .map(key => params[key] && `${key}=${params[key]}`)
    .filter(value => !!value)
    .join('&')
  return `${path}?${query}`
}

export const preventXSS = function (string) {
  if (!isString(string)) return string
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }
  const reg = /[&<>"'/]/gi
  return string.replace(reg, match => map[match])
}

export const reverseXSS = function (string) {
  if (!isString(string)) return string
  const map = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x2F;': '/',
  }
  const reg = /&am;|&lt;|&gt;|&quot;|&#x27;|&#x2F;/gi
  return string.replace(reg, match => map[match])
}
