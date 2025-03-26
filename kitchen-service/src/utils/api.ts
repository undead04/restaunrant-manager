import axios from "axios";
const url = {
  urlOrder: "http://localhost:4004",
  orderDetail: "orderDetails",
};
const content = {
  json: "application/json",
  formData: "multipart/form-data",
};
const instance = axios.create({
  headers: {
    "Content-Type": content.json,
    Accept: "application/json",
  },
});

const api = {
  url,
  content,
  get: instance.get,
  post: instance.post,
  delete: instance.delete,
  put: instance.put,
  patch: instance.patch,
};
export default api;
