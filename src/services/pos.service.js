import { API, GET_METHOD } from "~/configs/consts/api.const";
import { dkLogger } from "~/utils/DkLogger";
import api from "~/utils/HttpRequest";

export const getAllTables = async () => {
  try {
    const tables = await api({
      url: `${API.GET_ALL_TABLES}`,
      method: GET_METHOD,
    })
    dkLogger('success', 'GET ALL TABLES', null, tables);
    return tables;
  }
  catch (error) {
    dkLogger('error', 'GET ALL TABLES', null, error);
  }
  return [];
}

export const getOrderByTable = async (id) => {
  try {
    const order = await api({
      url: `${API.GET_ALL_ORDER_BY_TABLE}/${id}`,
      method: GET_METHOD,
    })
    dkLogger('success', 'GET ORDER BY TABLE', null, order);
    return order;
  }
  catch (error) {
    dkLogger('error', 'GET ORDER BY TABLE', null, error);
  }
  return {};
}