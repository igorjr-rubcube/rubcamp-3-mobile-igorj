import {AxiosError, AxiosResponse} from 'axios';
import api, {DefaultResponse} from '../api';

export const changeAppPassword = async (
  token: string,
  id: string,
  oldPassword: string,
  newPassword: string,
): Promise<DefaultResponse | undefined | null> => {
  return await api
    .put(
      `/users/${id}/change-password`,
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
      {
        headers: {
          authorization: token,
        },
      },
    )
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

export const changeTransactionalPassword = async (
  token: string,
  id: string,
  idAccount: string,
  oldPassword: string,
  newPassword: string,
): Promise<DefaultResponse | undefined | null> => {
  return await api
    .put(
      `/users/${id}/accounts/${idAccount}/change-password`,
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
      {
        headers: {
          authorization: token,
        },
      },
    )
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

export const requestEmailRecoverPassword = async (
  cpf: string,
): Promise<DefaultResponse | undefined | null> => {  
  return await api
    .post(
      `/login/forgotPassword`,
      {
        cpf: cpf,
      },
    )
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

export const recoverPassword = async (
  token: string,
  password: string,
): Promise<DefaultResponse | undefined | null> => {  
  return await api
    .put(
      `/login/forgotPassword/${token}`,
      {
        password: password,
      },
    )
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

export const requestEmailUnblockAccount = async (
  cpf: string,
): Promise<DefaultResponse | undefined | null> => {  
  return await api
    .post(
      `/login/unblockUser`,
      {
        cpf: cpf,
      },
    )
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

export const unblockUser = async (
  token: string,
  password: string,
): Promise<DefaultResponse | undefined | null> => {  
  return await api
    .put(
      `/login/unblockUser/${token}`,
      {
        password: password,
      },
    )
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