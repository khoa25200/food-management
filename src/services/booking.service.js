import { API, DELETE_METHOD, GET_METHOD, POST_METHOD, PUT_METHOD } from "~/configs/consts/api.const";
import { dkLogger } from "~/utils/DkLogger";
import api from "~/utils/HttpRequest";


export const createBooking = async (data) => {
  try {
    const booking = await api({
      url: `${API.CREATE_BOOKING}`,
      method: POST_METHOD,
      data: JSON.stringify(data)
    })
    dkLogger('success', 'CREATE_BOOKING', null, booking);
    return booking;
  }
  catch (error) {
    dkLogger('error', 'CREATE_BOOKING', null, error);
  }
  return {};
}
