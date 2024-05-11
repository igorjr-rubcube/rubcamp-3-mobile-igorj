import {AxiosError, AxiosResponse} from 'axios';
import api, {DefaultResponse} from '../axios/api';

interface UserData {
  cpf: string;
  fullName: string;
  email: string;
  phone: string;
  birthdate: string;
}

export const validateUserData = async (
  userData: UserData,
): Promise<DefaultResponse | undefined | null> => {
  return await api
    .post(`/onboarding/userData`, {
        ...userData,
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
