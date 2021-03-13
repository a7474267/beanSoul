import axios from 'axios';

const userRequest = axios.create({
  baseURL: `${process.env.VUE_APP_APIPATH}`,
});

// user 相關api
export const userLogin = (data) => userRequest.post('/admin/signin', data);
export const userLogout = () => userRequest.post('/logout');
export const userLoginCheck = () => userRequest.post('/api/user/check');

// backend 相關api
export const beAddProduct = (data) => userRequest.post(`/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`, data);
export const beEditProduct = (data, id) => userRequest.put(`/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${id}`, data);
