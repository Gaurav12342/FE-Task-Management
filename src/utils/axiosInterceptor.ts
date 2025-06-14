/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const userToken: any = localStorage.getItem("user-token");
const isLogged: any = JSON.parse(userToken);
const baseurl = import.meta.env.VITE_API_URL;

if (isLogged) {
  axios.defaults.baseURL = baseurl;
  axios.defaults.headers.common["Authorization"] = `Bearer ${isLogged}`;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  axios.interceptors.request.use(
    (request) => {
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

export default axios;
