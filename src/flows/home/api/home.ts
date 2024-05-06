import {AxiosError, AxiosResponse} from 'axios';
import api from '../../../axios/api';

type BalanceResponse = {
  code: number;
  data: any;
};

export const getBalance = async (
  token: string,
  id: string,
  idAccount: string,
): Promise<BalanceResponse | undefined | null> => {
  return await api
    .get(`/users/${id}/accounts/${idAccount}/balance`, {
      headers: {
        'authorization': token,
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
        const responseObject = {
          code: error.response.status,
          data: error.response.data as object,
        };
        return responseObject;
      }
    });
};
