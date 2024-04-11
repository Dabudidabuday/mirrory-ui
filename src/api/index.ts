import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  // headers: {
  //   "Access-Control-Allow-Origin": true,
  // },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const response = await api.post(
        "/refresh",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      }

      return api(error.config);
    }
  }
);
