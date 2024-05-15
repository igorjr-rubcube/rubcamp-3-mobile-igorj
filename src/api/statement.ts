import {AxiosError, AxiosResponse} from 'axios';
import api, {DefaultResponse} from '../axios/api';

export interface GetFilteredStatementParams {
    order?: 'asc' | 'desc';
    operation?: 'in' | 'out' | 'both';
    status?: 'COMPLETED' | 'SCHEDULED' | 'FAILED';
    start?: string;
    end?: string;
    skip?: number;
    take?: number;
}

export const getFilteredStatement = async (
  token: string,
  id: string,
  idAccount: string,
    params: GetFilteredStatementParams,
): Promise<DefaultResponse | undefined | null> => {
  return await api
    .get(`/users/${id}/accounts/${idAccount}/statement`, {
      headers: {
        authorization: token,
      },
      params: {
        order: params.order,
        operation: params.operation,
        status: params.status,
        start: params.start,
        end: params.end,
        skip: params.skip,
        take: params.take,
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
