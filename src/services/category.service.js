import { API, GET_METHOD } from "~/configs/consts/api.const";
import { dkLogger } from "~/utils/DkLogger";
import api from "~/utils/HttpRequest";

export const getAllCategories = async () => {
  try {
    const categories = await api({
      url: `${API.GET_ALL_CATEGORIES}`,
      method: GET_METHOD,
    })
    dkLogger('success', 'GET ALL CATEGORIES', null, categories);
    return categories;
  }
  catch (error) {
    dkLogger('error', 'GET ALL CATEGORIES', null, error);
  }
  return [];
}