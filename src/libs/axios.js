import { create } from 'axios';

const axiosAPI = create({
  baseURL: process.env.REACT_APP_BASE_URL
});

export {
  axiosAPI
};
