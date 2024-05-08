import {AxiosError, AxiosResponse} from 'axios';
import api, {DefaultResponse} from '../axios/api';

export const login = async (
  cpf: string,
  password: string,
): Promise<DefaultResponse | undefined | null> => {
  return await api
    .post('/login', {
      cpf: cpf,
      password: password,
    })
    .then((response: AxiosResponse) => {
      const responseObject = {
        code: response.status,
        data: response.data as object,
      };
      return responseObject;
    })
    .catch((error: AxiosError) => {
      console.log(error);
      if (error.response) {
        console.log(error.response.data);
        const responseObject = {
          code: error.response.status,
          data: error.response.data as object,
        };
        return responseObject;
      }
    });
};

export const getUserId = (token: string) => {
  return JSON.parse(atob(token.split('.')[1])).id;
};

export const getAccounts = async (
  token: string,
  id: string,
): Promise<DefaultResponse | undefined | null> => {
  return await api
    .get(`/users/${id}/accounts/`, {
      headers: {
        authorization: token,
      },
    })
    .then((response: AxiosResponse) => {
      const responseObject = {
        code: response.status,
        data: response.data as object,
      };
      return responseObject;
    })
    .catch((error: AxiosError) => {
      console.log(error);
      if (error.response) {
      console.log(error.response.data);
        const responseObject = {
          code: error.response.status,
          data: error.response.data as object,
        };
        return responseObject;
      }
    });
};
