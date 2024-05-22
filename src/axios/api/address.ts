import {AxiosError, AxiosResponse} from 'axios';
import api, {DefaultResponse} from '../axios/api';
import { AddressState } from '../redux/slices/AddressSlice';

export const getAddress = async (
  token: string,
  id: string,
): Promise<DefaultResponse | undefined | null> => {
  return await api
    .get(`/users/${id}/address`, {
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

export const updateAddress = async (
  token: string,
  id: string,
  address: AddressState,
): Promise<DefaultResponse | undefined | null> => {
  const {cep, street, number, complement, neighborhood, city, state} = address;
  return await api
    .put(
      `/users/${id}/address`,
      {
        cep: cep,
        street: street,
        number: number,
        complement: complement,
        neighborhood: neighborhood,
        city: city,
        state: state,
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
