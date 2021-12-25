import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('type');

      localStorage.setItem('authError', true);

      window.location.replace('/auth/login');
    }

    return Promise.reject(error);
  },
);

export default api;
