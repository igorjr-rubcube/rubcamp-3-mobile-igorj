import {AxiosError, AxiosResponse} from 'axios';
import api, {DefaultResponse} from '../api';

export const getUserInfo = async (
  token: string,
  id: string,
): Promise<DefaultResponse | undefined | null> => {
  return await api
    .get(`/users/${id}`, {
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
