import axios from "./Axios_Customize";

export const getOrders = (userId) => {
  const url = `/api/order?userId=${userId}`;
  return axios.get(url);
};

export const createOrder = (body) => {
  const url = `/api/order/`;
  return axios.post(url, body);
};

export const updateOrder = (id, body) => {
  const url = `/api/order/${id}`;
  return axios.put(url, body);
};

export const deleteOrder = (id) => {
  const url = `/api/order/${id}`;
  return axios.delete(url);
};
