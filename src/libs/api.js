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

const predict = data => {
  return axiosAPI({
    method: 'post',
    url: 'public/test/predict',
    data
  });
}

export default {
  signup,
  login,
  predict
};
