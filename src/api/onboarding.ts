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

interface Address {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export const validateAddress = async (
  address: Address,
): Promise<DefaultResponse | undefined | null> => {
  return await api
    .post(`/onboarding/userAddress`, {
      ...address,
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

export const validateAppPassword = async (
  password: string,
): Promise<DefaultResponse | undefined | null> => {
  return await api
    .post(`/onboarding/userAppPassword`, {
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

export const validateTransactionalPassword = async (
  password: string,
): Promise<DefaultResponse | undefined | null> => {
  return await api
    .post(`/onboarding/userTransactionalPassword`, {
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

interface CreateUserData {
  cpf: string;
  fullName: string;
  email: string;
  phone: string;
  birthdate: string;
  address: {
    cep: string;
  };
  password: string;
  account: {
    type: string;
    transactionPassword: string;
  };
}

export const createUser = async (
  userData: CreateUserData,
): Promise<DefaultResponse | undefined | null> => {
  return await api
    .post(`/onboarding`, {
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

export const createAccount = async (
  token: string,
  id: string,
  transactionPassword: string,
  type: string,
): Promise<DefaultResponse | undefined | null> => {
  return await api
    .post(`/users/${id}/accounts`, {
      userId: id,
      account: {
        transactionPassword: transactionPassword,
        type: type,
      }
    },
  {
    headers: {
      authorization: token,
    }
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
