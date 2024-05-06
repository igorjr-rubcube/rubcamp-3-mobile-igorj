import axios from 'axios';
import {REACT_APP_API_URL} from '@env';

export type DefaultResponse = {
  code: number;
  data: any;
};

const api = axios.create({
  baseURL: REACT_APP_API_URL,
});

export default api;