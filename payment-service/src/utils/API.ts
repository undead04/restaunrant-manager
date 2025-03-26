import axios from "axios";
const url = {
  urlDish: "http://localhost:4002",
  dish: "dish",
  urlOrder: "http://localhost:4004",
  order: "order",
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
