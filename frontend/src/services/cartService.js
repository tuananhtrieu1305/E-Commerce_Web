import axios from "./Axios_Customize"; // Giả sử tệp Axios_Customize nằm trong src/utils/

/**
 * Lấy giỏ hàng của người dùng
 * GET /api/cart/
 * @param {number} userId - ID của người dùng
 * @returns {Promise} Axios promise
 */
export const getCart = (userId) => {
  const url = `/api/cart/?userId=${userId}`;
  return axios.get(url);
};

/**
 * Thêm sản phẩm vào giỏ hàng
 * POST /api/cart/items/
 * @param {number} userId - ID người dùng
 * @param {number} productId - ID sản phẩm
 * @param {number} qty - Số lượng
 * @returns {Promise} Axios promise
 */
export const apiAddItem = (userId, productId, qty) => {
  const url = "/api/cart/items/";
  const payload = { userId, productId, qty };
  return axios.post(url, payload);
};
export const apiSetQty = (userId, productId, qty) => {
  return axios.put(
    `/api/cart/items/${productId}/qty`,
    { qty: Number(qty) },
    { params: { userId } }
  ).then(r => r.data);
};

/**
 * Thay đổi số lượng sản phẩm
 * PATCH /api/cart/items/{itemId}
 * @param {number} userId - ID người dùng
 * @param {number} itemId - ID của CartItem
 * @param {number} delta - Lượng thay đổi (ví dụ: 1 hoặc -1)
 * @returns {Promise} Axios promise
 */
export const apiChangeQty = (userId, itemId, delta) => {
  const url = `/api/cart/items/${itemId}`;
  const payload = { userId, delta };
  return axios.patch(url, payload); // Dùng PATCH cho API của bạn
};

/**
 * Xóa một sản phẩm khỏi giỏ hàng
 * DELETE /api/cart/items/{itemId}
 * @param {number} userId - ID người dùng
 * @param {number} itemId - ID của CartItem
 * @returns {Promise} Axios promise
 */
export const apiRemoveItem = (userId, itemId) =>
  axios.delete(`/api/cart/items/${itemId}`, { params: { userId } });
