import { AxiosError } from "axios";

export interface ApiException {
    response: {
        status: number;
    };
}

export type ApiError = AxiosError<ApiException>;
