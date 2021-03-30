import axios, { CancelTokenSource } from "axios";
import { useCallback, useEffect, useRef } from "react";

export const useCreateCancelToken = () => {
    const cancelTokenSource = useRef<CancelTokenSource>();

    useEffect(
        () => () => {
            cancelTokenSource.current?.cancel();
        },
        []
    );

    const createCancelToken = useCallback(() => {
        if (!cancelTokenSource.current) {
            cancelTokenSource.current = axios.CancelToken.source();
        }

        return cancelTokenSource.current.token;
    }, []);

    return createCancelToken;
};
