import { usePrevious } from "features/common/hooks";
import { pushNotification, setLoaderState } from "features/layout/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGlobalLoader = (isLoading: boolean) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoaderState(isLoading));

        return () => {
            dispatch(setLoaderState(false));
        };
    }, [dispatch, isLoading]);
};

export const useErrorNotification = (message: string, dispatchFlag?: boolean) => {
    const dispatch = useDispatch();
    const previousDispatchFlag = usePrevious(dispatchFlag);

    useEffect(() => {
        if (dispatchFlag && !previousDispatchFlag) {
            dispatch(pushNotification({ message, type: "error" }));
        }
    }, [dispatch, dispatchFlag, message, previousDispatchFlag]);
};

export const useSuccessNotification = (message: string, dispatchFlag?: boolean) => {
    const dispatch = useDispatch();
    const previousDispatchFlag = usePrevious(dispatchFlag);

    useEffect(() => {
        if (dispatchFlag && !previousDispatchFlag) {
            dispatch(pushNotification({ message, type: "success" }));
        }
    }, [dispatch, dispatchFlag, message, previousDispatchFlag]);
};
