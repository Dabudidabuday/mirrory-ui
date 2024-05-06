import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  withCredentials: true,
  // headers: {
  //   "Access-Control-Allow-Origin": true,
  // },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const auth = api.defaults.headers.common["Authorization"];
    if (error.response.status === 401 && !!auth) {
      const response = await api.post(
        "/refresh",
        {},
        { withCredentials: true }
      );

      if (response?.status === 200) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      }

      return api(error.config);
    }
  }
);
