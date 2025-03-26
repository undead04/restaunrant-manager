import axios from "axios";
const url = {
  urlTable: "http://localhost:4003",
  table: "table",
  urlDish: "http://localhost:4002",
  dish: "dish",
  urlAuth: "http://localhost:4001",
  user: "user",
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
