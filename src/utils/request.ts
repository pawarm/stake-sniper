import axios, { AxiosRequestConfig } from "axios";


export const sendRequest = async <T extends object | object[]>({
  method = 'GET',
  ...config
}: AxiosRequestConfig) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const requestConfig: AxiosRequestConfig = {
    headers,
    method,
    ...config
  };

  try {
    const response = await axios<T>(requestConfig);
    return response;
  } catch (err) {
    console.error(err);
    throw err
  }
};
