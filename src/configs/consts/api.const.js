const baseUrlENV = import.meta.env.VITE_BASE_URL;

const baseUrl = (!baseUrlENV || baseUrlENV == '/') ? 'https://truthful-tenderness-production.up.railway.app' : baseUrlENV;

const DEFAULT_BASE_URL = baseUrl + `/api/v1/auth`;

export const API = {
  GET_ALL_DISHES: `${DEFAULT_BASE_URL}/dishes`,
  GET_ALL_CATEGORIES: `${DEFAULT_BASE_URL}/category`,
  GET_ALL_ORDER_BY_TABLE: `${DEFAULT_BASE_URL}/order/by-table`,
  GET_ALL_TABLES: `${DEFAULT_BASE_URL}/table`,
  GET_INVOICES_BY_RANGE: `${DEFAULT_BASE_URL}/invoices/by-date-range`,




  CREATE_IMG_URL: `${DEFAULT_BASE_URL}/image`,
  CREATE_DISH: `${DEFAULT_BASE_URL}/dishes`,
  TEMP_ORDER: `${DEFAULT_BASE_URL}/order`,


  UPDATE_DISH: `${DEFAULT_BASE_URL}/dishes`,
  PAYMENT_ORDER: `${DEFAULT_BASE_URL}/order`,


  DELETE_DISH: `${DEFAULT_BASE_URL}/dishes`,
  DELETE_ORDER_DETAIL: `${DEFAULT_BASE_URL}/orderDetail`
}

export const GET_METHOD = 'GET'
export const POST_METHOD = 'POST'
export const DELETE_METHOD = 'DELETE'
export const PUT_METHOD = 'PUT'
export const PATCH_METHOD = 'PATCH'
export const DEFAULT_URL = '/'
