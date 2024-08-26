import { API, DELETE_METHOD, GET_METHOD, POST_METHOD, PUT_METHOD } from "~/configs/consts/api.const";
import { dkLogger } from "~/utils/DkLogger";
import api from "~/utils/HttpRequest";


export const getAllDishes = async (page, size, sortBy = 'id', sortDirection = 'asc', category) => {
  try {
    const dishes = await api({
      url: `${API.GET_ALL_DISHES}`,
      params: {
        page,
        size,
        sortBy,
        sortDirection,
        ...(category != null && { category })
      },
      method: GET_METHOD,
    })
    // dkLogger('success', 'GET ALL DISHES', null, dishes);
    return dishes;
  }
  catch (error) {
    // dkLogger('error', 'GET ALL DISHES', null, error);
  }
  return
}

export const searchDish = async (keyword) => {
  try {
    const dishes = await api({
      url: `${API.SEARCH_DISHES}`,
      params: {
        keyword,
      },
      method: GET_METHOD,
    })
    // dkLogger('success', 'GET ALL DISHES', null, dishes);
    return dishes;
  }
  catch (error) {
    // dkLogger('error', 'GET ALL DISHES', null, error);
  }
  return
}

export const updateDish = async (id, data) => {
  try {
    const dishes = await api({
      url: `${API.UPDATE_DISH}/${id}`,
      method: PUT_METHOD,
      data
    })
    dkLogger('success', 'UPDATE DISH', null, dishes);
    return dishes;
  }
  catch (error) {
    dkLogger('error', 'UPDATE DISH', null, error);
  }
  return
}

export const deleteDish = async (id) => {
  try {
    const dish = await api({
      url: `${API.UPDATE_DISH}/${id}`,
      method: DELETE_METHOD
    })
    dkLogger('success', 'DELETE DISH', null, dish);
    return dish;
  }
  catch (error) {
    dkLogger('error', 'DELETE DISH', null, error);
  }
  return
}

export const createDish = async (data) => {
  try {
    const dish = await api({
      url: `${API.CREATE_DISH}}`,
      method: POST_METHOD,
      data: JSON.stringify(data)
    })
    dkLogger('success', 'CREATE DISH', null, dish);
    return dish;
  }
  catch (error) {
    dkLogger('error', 'CREATE DISH', null, error);
  }
  return
}