import { GET_METHOD } from '~/configs/consts/api.const'
import { buildParams } from './Helper'


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
    body: data,
  }

  if (method === GET_METHOD) {
    delete opts.body
  }
  const response = await fetch(`${url}?${buildParams(params)}`, opts).then(
    response => {
      if (response.ok) {
        if (response.status !== 204) {
          return response?.json();
        }
      } else {
        switch (response.status) {
          case 500:
            // Handle 500 error here
            break;

          case 401:
            const checkURL = new URL(url);
            const arr = checkURL.pathname.split('/');
            // Handle 401 error here
            break;

          default:
            return response.json().then(result => {
              return Promise.reject(
                new Error(result?.title || result?.message || result?.code),
              );
            });
        }
      }
    },
  )
  if (!response) return;
  return response;
}

export default api
