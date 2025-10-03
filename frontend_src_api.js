import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL || '' });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => (error ? prom.reject(error) : prom.resolve(token)));
  failedQueue = [];
};

api.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config;
  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) { localStorage.removeItem('token'); return Promise.reject(error); }
    if (isRefreshing) {
      return new Promise(function(resolve, reject) { failedQueue.push({ resolve, reject }); }).then(token => {
        originalRequest.headers['Authorization'] = 'Bearer ' + token;
        return api(originalRequest);
      }).catch(err => Promise.reject(err));
    }
    isRefreshing = true;
    try {
      const res = await axios.post((process.env.REACT_APP_API_URL || '') + '/auth/refresh', { refreshToken });
      const newToken = res.data.data?.token || res.data.token;
      const newRefresh = res.data.data?.refreshToken || res.data.refreshToken;
      localStorage.setItem('token', newToken);
      if (newRefresh) localStorage.setItem('refreshToken', newRefresh);
      api.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
      processQueue(null, newToken);
      originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      localStorage.removeItem('token'); localStorage.removeItem('refreshToken');
      return Promise.reject(err);
    } finally { isRefreshing = false; }
  }
  return Promise.reject(error);
});

export default api;
