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