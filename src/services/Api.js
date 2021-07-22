import axios from "axios";

const API = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  timeout: 5000
});
export default API;
