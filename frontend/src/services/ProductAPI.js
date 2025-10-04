import axios from "./Axios_Customize";

export const getProduct = (query) => {
  const url = `/api/product/${query}`;
  return axios.get(url);
};
