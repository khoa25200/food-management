import { API, DELETE_METHOD, GET_METHOD, POST_METHOD, PUT_METHOD } from "~/configs/consts/api.const";
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

export const deleteOrderDetail = async (id) => {
  try {
    const deleteOrder = await api({
      url: `${API.DELETE_ORDER_DETAIL}/${id}`,
      method: DELETE_METHOD,
    })
    dkLogger('success', 'DELETE_ORDER_DETAIL', null, deleteOrder);
    return deleteOrder;
  }
  catch (error) {
    dkLogger('error', 'DELETE_ORDER_DETAIL', null, error);
  }
  return {};
}

export const tempCalculator = async (data) => {
  try {
    const orderTempCalculate = await api({
      url: `${API.TEMP_ORDER}`,
      method: POST_METHOD,
      data: JSON.stringify(data)
    })
    dkLogger('success', 'TEMP_ORDER', null, orderTempCalculate);
    return orderTempCalculate;
  }
  catch (error) {
    dkLogger('error', 'TEMP_ORDER', null, error);
  }
  return {};
}

export const paymentOrder = async (data) => {
  try {
    const payment = await api({
      url: `${API.PAYMENT_ORDER}`,
      method: PUT_METHOD,
      data: JSON.stringify(data)
    })
    dkLogger('success', 'PAYMENT_ORDER', null, payment);
    return payment;
  }
  catch (error) {
    dkLogger('error', 'PAYMENT_ORDER', null, error);
  }
  return {};
}