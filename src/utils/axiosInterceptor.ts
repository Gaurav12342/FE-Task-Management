import axios from "axios";

const baseurl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: baseurl,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔁 Dynamically set token before each request
api.interceptors.request.use(
  (request) => {
    const tokenString = localStorage.getItem("user-token");
    const token = tokenString ? JSON.parse(tokenString) : null;

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    } else {
      delete request.headers.Authorization;
    }

    return request;
  },
  (error) => Promise.reject(error)
);

export default api;
