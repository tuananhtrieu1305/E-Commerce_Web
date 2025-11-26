import axios from "./Axios_Customize";

export const getOrders = (userId) => {
  const url = `/api/order/?userId=${userId}`;
  return axios.get(url).then((res) => res);
};


export const createOrder = (body) => {
  const url = `/api/order/`;  
  return axios
    .post(url, body)
    .then((res) => res)
    .catch((err) => {
    console.log("BACKEND ERROR:", err.response);
    const msg = err?.response?.data?.message || err.message;
    throw new Error(msg);
});

};

export const updateOrder = (id, body) => {
  const url = `/api/order/${id}`;
  return axios
    .put(url, body)
    .then((res) => res.data)
    .catch((err) => {
      const msg =
        err?.response?.data?.message || err.message || "Lỗi khi cập nhật đơn";
      throw new Error(msg);
    });
};

export const deleteOrder = (id) => {
  const url = `/api/order/${id}`;
  return axios
    .delete(url)
    .then((res) => res.data)
    .catch((err) => {
      const msg =
        err?.response?.data?.message || err.message || "Lỗi khi xoá đơn";
      throw new Error(msg);
    });
};


export const createVnpayPayment = (orderId) => {
  return axios.post("/api/payment/create-vnpay", { orderId });
};

