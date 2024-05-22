import {AxiosError, AxiosResponse} from 'axios';
import api, {DefaultResponse} from '../axios/api';

export const getTransferById = async (
  token: string,
  id: string,
  idAccount: string,
  idTransfer: string,
): Promise<DefaultResponse | undefined | null> => {
  return await api
    .get(`/users/${id}/accounts/${idAccount}/transfers/${idTransfer}`, {
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

export const cancelTransfer = async (
  token: string,
  id: string,
  idAccount: string,
  idTransfer: string,
): Promise<DefaultResponse | undefined | null> => {
  return await api
    .put(`/users/${id}/accounts/${idAccount}/transfers/${idTransfer}`, null, {
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

export const createTransfer = async (
  token: string,
  id: string,
  idAccount: string,
  transactionPassword: string,
  amount: number,
  description: string,
  toAccountNumber: string,
  toBranch: string,
): Promise<DefaultResponse | undefined | null> => {
  const body = description
    ? {
        transactionPassword,
        transfer: {
          amount,
          description,
          toAccountNumber,
          toBranch,
        },
      }
    : {
        transactionPassword,
        transfer: {
          amount,
          toAccountNumber,
          toBranch,
        },
      };
  return await api
    .post(`/users/${id}/accounts/${idAccount}/transfers/`, body, {
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
