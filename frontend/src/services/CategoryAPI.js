import axios from "./Axios_Customize";

export const getCategoryWithProduct = () => {
  const url = "/api/category/";
  return axios.get(url);
};
