import axios, { AxiosResponse, CancelToken } from "axios";
import config from "config";

const instance = axios.create({ baseURL: config.apiRoutes.base });

const handleResponsePromise = <TResult>(response: AxiosResponse<TResult | undefined>) =>
    response && (response.data as TResult);

export const baseApi = {
    get: async <TResult>(path: string, cancelToken: CancelToken): Promise<TResult> => {
        return instance.get(path, { cancelToken }).then(handleResponsePromise);
    },
    post: async <TData, TResult>(path: string, data: TData, cancelToken: CancelToken): Promise<TResult> => {
        return instance.post(path, data, { cancelToken });
    },
};

export default baseApi;
