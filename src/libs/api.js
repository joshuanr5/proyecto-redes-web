import { axiosAPI } from './axios';

const signup = data => {
  return axiosAPI({
    method: 'post',
    url: 'public/auth/signup',
    data
  });
};

const login = data => {
  return axiosAPI({
    method: 'post',
    url: 'public/auth/login',
    data
  });
};

export default {
  signup,
  login
};
