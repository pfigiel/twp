import axios, { AxiosResponse, CancelToken } from "axios";
import config from "config";
import { appendAuthHeaderInterceptor, handleCancelErrorInterceptor, refreshTokenInterceptor } from "./interceptors";

const instance = axios.create({ baseURL: config.apiRoutes.base });

instance.interceptors.request.use(appendAuthHeaderInterceptor);
instance.interceptors.response.use.apply(instance.interceptors.response, refreshTokenInterceptor(instance));
instance.interceptors.response.use((response) => response, handleCancelErrorInterceptor);

const handleResponsePromise = <TResult>(response: AxiosResponse<TResult | undefined>) =>
    response && (response.data as TResult);

export const baseApi = {
    get: async <TResult>(url: string, cancelToken: CancelToken): Promise<TResult> => {
        return instance.get(url, { cancelToken }).then(handleResponsePromise);
    },
    post: async <TData, TResult>(url: string, data: TData, cancelToken: CancelToken): Promise<TResult> => {
        return instance.post(url, data, { cancelToken }).then(handleResponsePromise);
    },
};

export default baseApi;
