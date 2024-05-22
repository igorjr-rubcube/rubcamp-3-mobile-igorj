import {AxiosError, AxiosResponse} from 'axios';
import api, {DefaultResponse} from '../api';

export const searchAccountsByCpf = async (
  token: string,
  id: string,
  idAccount: string,
  cpf: string,
): Promise<DefaultResponse | undefined | null> => {
  return await api
    .get(`/users/${id}/accounts/${idAccount}/search`, {
        headers: {
          authorization: token,
        },
        params: {
            cpf: cpf
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

export const getByBranchAndNumber = async (
  token: string,
  id: string,
  idAccount: string,
  branch: string,
  number: string,
): Promise<DefaultResponse | undefined | null> => {
  return await api
    .get(`/users/${id}/accounts/${idAccount}/branch-number`, {
        headers: {
          authorization: token,
        },
        params: {
            branch: branch,
            number: number
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