import { API, GET_METHOD } from "~/configs/consts/api.const";
import { dkLogger } from "~/utils/DkLogger";
import api from "~/utils/HttpRequest";

export const getInvoicesByRange = async (start, end) => {
  try {
    const invoices = await api({
      url: `${API.GET_INVOICES_BY_RANGE}`,
      method: GET_METHOD,
      params: {
        startDate: start,
        endDate: end,
      },
    })
    dkLogger('success', 'GET ALL INVOICE', null, invoices);
    return invoices;
  }
  catch (error) {
    dkLogger('error', 'GET ALL INVOICE', null, error);
  }
  return [];
}
