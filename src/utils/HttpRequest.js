// TODO: Remove eslint-disable

/* eslint-disable */
import { DELETE_METHOD, GET_METHOD } from '../config/api.constants'
import { CustomPopup } from '../layout/modules/CustomPopup'
// import { config } from './../config'
import { buildParams } from './Helper'
import usePortal from './usePortal'
import ReactDOM from 'react-dom'
// import { getToken } from '../layout/pages/ShoppingCartPage/helpers'

export const ConfigType = {
  data: Object,
  query: Object,
  timeout: Number,
  headers: Object,
}

export const httpMethodsType = {
  /**
   *
   * @param {String} path
   * @param {ConfigType} config
   * @returns {Promise<any>}
   */
  get: async (path, config) => await new Promise(),
  /**
   *
   * @param {String} path
   * @param {ConfigType} config
   * @returns {Promise<any>}
   */
  post: async (path, config) => await new Promise(),
  /**
   *
   * @param {String} path
   * @param {ConfigType} config
   * @returns {Promise<any>}
   */
  put: async (path, config) => await new Promise(),
  /**
   *
   * @param {String} path
   * @param {ConfigType} config
   * @returns {Promise<any>}
   */
  patch: async (path, config) => await new Promise(),
  /**
   *
   * @param {String} path
   * @param {ConfigType} config
   * @returns {Promise<any>}
   */
  delete: async (path, config) => await Promise.resolve(),
}

const showPopupError = ({ status, response }) => {
  usePortal('content-popup')
  const popup = document.querySelector(`#content-popup`)
  const handleClosePopUp = () => {
    popup.remove()
  }
  ReactDOM.render(
    CustomPopup.fail(
      'Something went wrong',
      response.statusText || status,
      handleClosePopUp,
    ),
    popup,
  )
}

const showPopupAuthorizedError = ({ status, response }) => {
  usePortal('content-popup')
  const popup = document.querySelector(`#content-popup`)
  const handleClosePopUp = () => {
    popup.remove()
  }
  ReactDOM.render(
    CustomPopup.failAuthorized(
      'User Session Expired',
      response.statusText || status,
      handleClosePopUp,
    ),
    popup,
  )
}

// /**
//  * @type {httpMethodsType}
//  */
const api = async ({
  url,
  params = {},
  method = GET_METHOD,
  headers = {},
  data = {},
  options = {},
}) => {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
    credentials: 'include',
    redirect: 'follow',
    sameSite: 'None',
    ...options,
    body: JSON.stringify(data),
  }

  if (method === GET_METHOD) {
    delete opts.body
  }

  const response = await fetch(`${url}?${buildParams(params)}`, opts).then(
    response => {
      if (response.ok) {
        if (response.status !== 204) {
          return response.json()
        }
      } else {
        if (response.status === 500) {
          // show pop up error
          showPopupError({
            response,
            status:
              'Sorry, the website is currently experiencing system problems',
          })
        }
        if (response.status === 401) {
          const checkURL = new URL(url)
          const arr = checkURL.pathname.split('/')
          const keyCheck = arr[arr.length - 1]
          console.log(checkURL)
          if (keyCheck === 'AddToWishlist') {
            const parent = document.querySelector('.user__auth[popup]')
            parent
              .querySelector(`[data-user="wishlistUnlogin"]`)
              .classList.add('active')
          } else {
            showPopupAuthorizedError({
              response,
              status: 'You have been logged out, please login again',
            })
          }
        }

        return response.json().then(result => {
          return Promise.reject(
            new Error(result?.title || result?.message || result?.code),
          )
        })
      }
    },
  )
  if (!response) return
  return response
}

export default api
