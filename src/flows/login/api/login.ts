import {AxiosError, AxiosResponse} from 'axios';
import api from '../../../axios/api';
type LoginResponse = {
  code: number;
  data: any;
};

export const login = async (
  cpf: string,
  password: string,
): Promise<LoginResponse | undefined | null> => {
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
      console.log(responseObject);
      return responseObject;
    })
    .catch((error: AxiosError) => {
      console.log(error);
      if (error.response) {
        const responseObject = {
          code: error.response.status,
          data: error.response.data as object,
        };
        console.log(responseObject);
        return responseObject;
      }
    });
};
