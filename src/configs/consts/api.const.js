const baseUrlENV = import.meta.env.VITE_BASE_URL;

const baseUrl = (!baseUrlENV || baseUrlENV == '/') ? 'https://truthful-tenderness-production.up.railway.app' : baseUrlENV;

const DEFAULT_BASE_URL = baseUrl + `/api/v1/auth`;

export const API = {
  GET_ALL_DISHES: `${DEFAULT_BASE_URL}/dishes`,
  GET_ALL_CATEGORIES: `${DEFAULT_BASE_URL}/category`,
  GET_ALL_TABLES: `${DEFAULT_BASE_URL}/table`,




  CREATE_IMG_URL: `${DEFAULT_BASE_URL}/image`,
  CREATE_DISH: `${DEFAULT_BASE_URL}/dishes`,



  UPDATE_DISH: `${DEFAULT_BASE_URL}/dishes`,



  DELETE_DISH: `${DEFAULT_BASE_URL}/dishes`
}

export const GET_METHOD = 'GET'
export const POST_METHOD = 'POST'
export const DELETE_METHOD = 'DELETE'
export const PUT_METHOD = 'PUT'
export const PATCH_METHOD = 'PATCH'
export const DEFAULT_URL = '/'
