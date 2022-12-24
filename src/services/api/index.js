import axios from "axios";

// 192.168.0.102
//192.168.1.6 Laura
const api = axios.create({
  baseURL: "http://192.168.1.6:3333",
});

export default api;
