import axios from 'axios';

const APP_ENDPOINT = 'https://63f5c33d59c944921f66189c.mockapi.io/api/v1';

export class BaseService {
  public static post = (path: string, payload: any) => {
    return axios.post(APP_ENDPOINT + path, payload);
  };

  public static get = async (path: string, params?: any) => {
    const res = await axios.get(APP_ENDPOINT + path, {
      params: params,
    });
    return res.data;
  };
}
