/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable compat/compat */
/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable no-self-assign */

/* eslint-disable guard-for-in */
import CryptoJS from 'crypto-js'
import { KEY, IV } from '@root/src/config'
import { config } from '../config/index'
import { t } from '@root/src/_shared/common'
import {
  countWishList,
  postWishList,
  removeWishList,
  refreshCache,
} from '@root/src/services/productdetail'
import map from 'lodash/map'
import React from 'react'
import queryString from 'query-string'
import get from 'lodash/get'
import has from 'lodash/has'
import keys from 'lodash/keys'
import i18n from '@root/src/i18n/i18n'
import AddToWishlistAlert from '../layout/pages/ProductDetail/development/components/AddToWishlistAlert'
import RemoveWishlistAlert from '../layout/pages/ProductDetail/development/components/RemoveWishlistAlert'
import { translate } from '../languages'

const getRndInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const filterObject = (o, filter) => {
  const r = {}
  Object.keys(o).forEach(k => {
    if (filter(o[k], k)) r[k] = o[k]
  })
  return r
}

const debounce = (callback, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      callback.apply(this, args)
    }, wait)
  }
}

/**
 *
 * @param {number} ms
 * @returns
 */
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const getDataFromProduction = data => {
  if (config.NODE_ENV === 'development') {
    return {}
  }

  return data
}

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth

const getContentBrandProductList = (contents, byCode) => {
  const r = contents
    // eslint-disable-next-line max-len
    .filter(
      x =>
        x.contentCode === byCode &&
        x.contentProductLists.length &&
        x.contentProductLists[0].products,
    )
    .map(x => ({
      items: x?.contentProductLists[0]?.products?.map(y => ({
        addedToWishlist: y.addedToWishlist,
        navigationLink: y.slug,
        slug: y.slug,
        defaultImageUrl: y.defaultImageUrl,
        details: y.details,
        name: y.name,
        brand: y.brand,
        display_OriginalPrice: y.display_OriginalPrice,
        display_RetailPrice: y.display_RetailPrice,
        exclusive: y.exclusive,
        title: y.title,
        isNew: y.isNew,
        isPromotion: y.isPromotion,
        ean: y.ean,
      })),
      title: x?.title,
    }))
  return r || [{ items: [], title: '' }]
}

const getContentFeatureCategories = (contents, byCode) => {
  const r = contents?.filter(x => x.contentCode === byCode).map(ele => ele)
  return r || []
}

const getSorting = productList => {
  const sortings = productList?.facets?.sortings?.map(sorting => ({
    code: sorting?.code,
    name: t(sorting?.name),
  }))
  return sortings
}

/**
 *
 * @param {{[x:any]: any}} obj
 * @param {Array<string>} keyss
 * @returns
 */
const omit = (obj, keyss) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => !keyss.includes(k)))

const classConcat = classes => {
  if (classes.length) {
    return classes.filter(className => !!className).join(' ')
  }
  return ''
}

const paginationWithDots = (c, m, isMobile = false) => {
  const current = c
  const last = m
  const rangeWithDots = []
  if (!isMobile) {
    const delta = 2
    const left = current - delta
    const right = current + delta + 1
    const range = []
    let l

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= last; i++) {
      if (i === 1 || i === last || (i >= left && i < right)) {
        range.push(i)
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1)
        } else if (i - l !== 1) {
          rangeWithDots.push('...')
        }
      }
      rangeWithDots.push(i)
      l = i
    }

    return rangeWithDots
  }

  if (c === m) {
    if (!rangeWithDots.includes(1)) {
      rangeWithDots.push(1)
    }

    if (c === 3) {
      rangeWithDots.push(2)
    } else if (c > 3) {
      rangeWithDots.push('...')
    }
    rangeWithDots.push(m)

    return rangeWithDots
  }
  if (!rangeWithDots.includes(c)) {
    rangeWithDots.push(c)
  }
  if (m - c === 2) {
    rangeWithDots.push(c + 1)
  } else if (m - c > 2) {
    rangeWithDots.push('...')
  }
  rangeWithDots.push(m)

  return rangeWithDots
}

function isClassComponent(component) {
  return (
    typeof component === 'function' && !!component.prototype.isReactComponent
  )
}

function isFunctionComponent(component) {
  return (
    typeof component === 'function' &&
    // TODO: rearch check isFunctionComponent
    String(component).indexOf('.createElement') > -1
  )
}

function isReactComponent(component) {
  return isClassComponent(component) || isFunctionComponent(component)
}

function isElement(element) {
  return React.isValidElement(element)
}

function isDOMTypeElement(element) {
  return isElement(element) && typeof element.type === 'string'
}

function isCompositeTypeElement(element) {
  return isElement(element) && typeof element.type === 'function'
}

function isHTML(str) {
  const regExp = /<\/?[a-z][\s\S]*>/i
  return regExp.test(str)
}

/**
 *
 * @param {string} val
 * @param {string} keyword
 * @returns {{beforeKeyword:string, keyword:string, afterKeyword:string}}
 */
function getKeywordSuggetion(val, keyword) {
  const _keyword = keyword.toLocaleLowerCase().trim()
  const _val = val.toLocaleLowerCase().trim()

  const indexKey = _val.indexOf(_keyword)
  if (indexKey === -1) return { beforeKeyword: val }
  const beforeKeyword = val.slice(0, indexKey)
  const suggetionKey = val.slice(indexKey, indexKey + keyword.length)
  const afterKeyword = val.slice(indexKey + keyword.length, _val.length)
  return {
    beforeKeyword,
    keyword: suggetionKey,
    afterKeyword,
  }
}

/**
 *
 * @param {HTMLElement} el
 * @returns {HTMLElement}
 */
function getComponentFromElement(el) {
  const internalInstance =
    el[Object.keys(el).find(key => key.startsWith('__reactInternalInstance$'))]
  if (!internalInstance) return null
  return internalInstance.stateNode
}

/**
 *
 * @param {any} element
 * @param {Array<string>} events
 * @param {() => {}} handler
 */
function addMultipleEventListener(element, events, handler) {
  events.forEach(e => element.addEventListener(e, handler))
}
/**
 *
 * @param {any} element
 * @param {Array<string>} events
 * @param {() => {}} handler
 */
function removeMultipleEventListener(element, events, handler) {
  events.forEach(e => element.removeEventListener(e, handler))
}

const createNewObjFilter = filter => {
  const newFilter = { ...filter }
  for (const key in newFilter) {
    const arr = []
    const arrCodes = []
    const arrValueIds = []
    if (newFilter[key].length === 0 || !newFilter[key]) delete newFilter[key]
    if (key === 'attributes') {
      if (Array.isArray(newFilter[key])) {
        newFilter[key].forEach(element => {
          const arrCode = element.code.split('/')
          arrCodes.push(arrCode[0])
          arrValueIds.push(arrCode[1])
        })
        if (arrCodes.length === arrValueIds.length) {
          delete newFilter[key]
          newFilter.AttributeCodes = arrCodes
          newFilter.AttributeValueIds = arrValueIds
        }
      }
    }
    if (key !== 'attributes') {
      if (Array.isArray(newFilter[key])) {
        newFilter[key].forEach(element => {
          if (typeof element === 'object') {
            arr.push(element.code)
          } else {
            arr.push(element)
          }
        })
        newFilter[key] = arr
      }
    }
    if (newFilter[key] && typeof newFilter[key] === 'string') {
      newFilter[key] = newFilter[key]
    }
  }
  return newFilter
}

const createLocalCheckFilter = facets => {
  const obj = queryString.parse(window.location.search)
  delete obj.AttributeCodes
  delete obj.AttributeValueIds
  const BrandCodes = (facets?.brands || []).filter(element => element.selected)
  const mapAttr = (facets?.attributes || []).map(element => {
    const attributeValues = (element.attributeValues || []).filter(
      ele => ele.selected,
    )
    return {
      attributeValues,
      name: t(element.name),
      code: element.code,
    }
  })
  const attr = mapAttr.filter(element => element.attributeValues.length !== 0)
  if (BrandCodes.length !== 0) {
    obj.BrandCodes = BrandCodes.map(element => ({
      code: element.code,
      name: translate('Brands'),
      nameCheckBox: t(element.name),
    }))
  }
  if (attr.length !== 0) {
    const attributes = []
    attr.forEach(element => {
      element.attributeValues.forEach(ele => {
        attributes.push({
          code: `${element.code}/${ele.code}`,
          name: element.name,
          nameCheckBox: t(ele.name),
        })
      })
    })
    obj.attributes = attributes
  }
  return obj
}

const contactUser = ({
  contactEmail,
  contactMobile,
  contactSMS,
  contactMail,
  contactCall,
}) => {
  const newsString = []
  if (contactEmail) {
    newsString.push({ Code: 'Email', DisplayText: 'Email', Value: 'Email' })
  }
  if (contactMobile) {
    newsString.push({
      Code: 'Mobile',
      DisplayText: 'Mobile',
      Value: 'Mobile',
    })
  }
  if (contactSMS) {
    newsString.push({
      Code: 'SMS',
      DisplayText: 'SMS',
      Value: 'SMS',
    })
  }
  if (contactMail) {
    newsString.push({
      Code: 'Mail',
      DisplayText: 'Mail',
      Value: 'Mail',
    })
  }

  if (contactCall) {
    newsString.push({
      Code: 'Call',
      DisplayText: 'Call',
      Value: 'Call',
    })
  }
  return newsString
}

/**
 *
 * @param {Array} categories
 * @param {number} cateLevel
 */
const createLevelCategory = (categories, cateLevel, selected = '') => {
  const categoryLevel = cateLevel + 1
  return categories.map(x => {
    const item = { ...x, categoryLevel }
    if (selected) item.selected = item.code === selected
    if (!x.subList || !x.subList.length) return item
    item.subList = createLevelCategory(
      item.subList || [],
      categoryLevel,
      selected,
    )
    return item
  })
}

const stringToHTML = str => {
  const e = document.createElement('div')
  e.innerHTML = str
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
}

const buildParams = data => {
  const params = new URLSearchParams()
  map(data, (value, key) => {
    if (Array.isArray(data[key])) {
      map(value, item => params.append(key, item))
    } else {
      params.append(key, value)
    }
  })

  return params
}

const getPathnameProduct = () => {
  const { pathname } = window.location
  const listPathname = pathname.split('/')
  if (listPathname.length > 2) {
    return listPathname[listPathname.length - 1]
  }
  return ''
}

const getPathnameContent = () => {
  const { pathname } = window.location
  return pathname.replace('/', '')
}

function getParameterByName(name) {
  const queryStringParams = window.location.search
  const urlParams = queryStringParams.split('?')
  const stringParams = urlParams[1]
  const listQueryParams = stringParams.split('&')
  const listResults = listQueryParams.map(item => {
    const indexEqualCharacter = item.indexOf('=')
    const key = item.substring(0, indexEqualCharacter)
    const value = item.substring(indexEqualCharacter + 1, item.length)
    return {
      [key]: value,
    }
  })
  const filterKeyParams = listResults
    .filter(item => item[name])
    .map(ele => ele[name])
  return (filterKeyParams.length > 0 && filterKeyParams[0]) || ''
}

const getEmailCodeResetPass = () => {
  return getParameterByName('c')
}

const getMobileNoResetPass = () => {
  return getParameterByName('mobile')
}
const getFormatDay = days => {
  if (days < 1) {
    return ''
  }
  if (days === 1) {
    return `${days} day `
  }

  return `${days} days `
}

const getId = url => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : null
}

const getLinkVideo = video => {
  const getHttpIndex = video.indexOf('http')
  const getHttp = video.slice(getHttpIndex, video.length - 1)
  const getEndLinkVideoIndex = getHttp.indexOf('"')
  const videoId = getId(getHttp.slice(0, getEndLinkVideoIndex))
  const iframeMarkup = `<object width="25%" height="315" data="//www.youtube.com/embed/${videoId}">`
  return iframeMarkup
}

const loadWishList = () => {
  countWishList().then(data => {
    const subTotalInCart =
      data.totalRecordCount < 100 ? data.totalRecordCount : 99
    const nodeCart = document.querySelector('.heart-item')
    const check = nodeCart.classList.contains('cart')
    if (!check) {
      nodeCart.classList.add('cart')
      nodeCart.querySelector('a').setAttribute('data-item-cart', subTotalInCart)
    } else {
      nodeCart
        .querySelector('[data-item-cart]')
        .setAttribute('data-item-cart', subTotalInCart)
    }
  })
}

const addToWishList = async ({
  ean,
  isWishList,
  setItemToWishList,
  setPopupContent,
  ishowPopup = true,
}) => {
  if (window.Metro.isLogin) {
    if (isWishList) {
      await removeWishList(ean)
      setPopupContent &&
        setTimeout(() => {
          setPopupContent(
            (() => (
              <>
                {ishowPopup && (
                  <RemoveWishlistAlert
                    ean={ean}
                    setWishList={setItemToWishList}
                    setPopupContent={setPopupContent}
                    timeStamp={new Date().getTime()}
                  />
                )}
              </>
            ))(),
          )
        }, 100)
    } else {
      await postWishList(ean)
      setPopupContent &&
        setTimeout(() => {
          setPopupContent(
            (() => (
              <AddToWishlistAlert
                ean={ean}
                timeStamp={new Date().getTime()}
                setPopupContent={setPopupContent}
              />
            ))(),
          )
        }, 100)
    }
    loadWishList()
    setItemToWishList(!isWishList)
  } else {
    localStorage.setItem('eanWishlist', ean)
    const isPopUp = document.querySelector('.user__auth[popup]')
    let auth
    if (isPopUp) auth = isPopUp.closest('.user__auth')
    let popup = null
    popup = auth.querySelector(`[data-user="wishlistUnlogin"]`)
    if (!popup) return
    popup.classList.add('active')
  }
}

const checkValueError = validations => (values, props) => {
  const error = {}
  let checkValidate = false
  keys(validations).forEach(path => {
    const pathValue = get(values, path)
    const isExistingKey = has(values, path)
    if (!isExistingKey && console) {
      // tslint:disable-next-line:no-console
      console.error(`The field ${path} does not existing on the form`)
    }
    for (let i = 0; i < validations[path].length; i += 1) {
      const pathItem = validations[path][i] ?? {}
      checkValidate = pathItem.validator(pathValue, values, props)
      if (!checkValidate) {
        const { code = '' } = pathItem
        const codeOptions = pathItem.codeOptions ?? {}
        const codeOptionLength = Object.entries(codeOptions)?.length
        error[path] =
          codeOptionLength > 0 ? i18n.t(code, { ...codeOptions }) : i18n.t(code)
        return error
      }
    }
  })

  return error
}

const nextFocusInput = e => {
  const { maxLength, value, name } = e
  const [fieldName, fieldIndex] = name.split('_')
  if (maxLength === value.length) {
    const nextSibling = document.querySelector(
      `input[name=${fieldName}_${+fieldIndex + 1}]`,
    )
    if (nextSibling !== null) {
      nextSibling.focus()
    }
  }
}

const nextAndPreKeydownInput = ({ listInput, name = 'text' }) => {
  listInput.forEach((ele, index) => {
    const eleInput = ele.querySelector(`input[name=${name}_${index + 1}]`)
    eleInput.addEventListener('keydown', function (e) {
      let count = index + 1
      if (e.keyCode === 37) {
        if (count - 1 < 1) return
        const nextSibling = document.querySelector(
          `input[name=${name}_${count - 1}]`,
        )
        nextSibling.focus({ preventScroll: false })
      }
      if (e.keyCode === 39) {
        if (count + 1 === 7) return
        const nextSibling = document.querySelector(
          `input[name=${name}_${count + 1}]`,
        )
        nextSibling.focus()
      }
      if (e.keyCode === 8) {
        if (count - 1 < 1) return
        if (!this.value) {
          const nextSibling = document.querySelector(
            `input[name=${name}_${count - 1}]`,
          )
          nextSibling.focus()
          nextSibling.value = ''
        } else {
          this.value = ''
        }
      }
    })
  })
}

const encrypted = value => {
  const key = CryptoJS.enc.Utf8.parse(KEY)
  const iv = CryptoJS.enc.Utf8.parse(IV)
  return CryptoJS.AES.encrypt(value, key, {
    iv,
  }).toString()
}

function formatPrice(num) {
  return (Math.round(num * 100) / 100)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export {
  createNewObjFilter,
  createLevelCategory,
  getPathnameProduct,
  getFormatDay,
  buildParams,
  isDOMTypeElement,
  isClassComponent,
  isFunctionComponent,
  isElement,
  isCompositeTypeElement,
  getContentBrandProductList,
  getContentFeatureCategories,
  isHTML,
  getListProducts,
  getCategories,
  debounce,
  getKeywordSuggetion,
  getAdditionInfos,
  omit,
  classConcat,
  getComponentFromElement,
  addMultipleEventListener,
  removeMultipleEventListener,
  paginationWithDots,
  getSorting,
  getWidth,
  getLinkVideo,
  addToWishList,
  getDataFromProduction,
  isReactComponent,
  getRndInteger,
  sleep,
  filterObject,
  loadWishList,
  createLocalCheckFilter,
  checkValueError,
  nextFocusInput,
  getEmailCodeResetPass,
  getMobileNoResetPass,
  encrypted,
  nextAndPreKeydownInput,
  stringToHTML,
  getPathnameContent,
  contactUser,
  formatPrice,
}
