import config from "config";
import { DeviceClass } from "features/common/types";
import { useCallback, useEffect, useRef, useState } from "react";

export const useOnResizeListener = (callback: () => void) => {
    useEffect(() => {
        window.addEventListener("resize", callback);

        return () => window.removeEventListener("resize", callback);
    });
};

export const useViewportSize = () => {
    const [viewportSize, setViewportSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    const onResize = () => setViewportSize({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    });

    return viewportSize;
};

export const useDeviceClass = () => {
    const viewportWidth = useViewportSize().width;

    const getDeviceClass = useCallback((): DeviceClass => {
        if (viewportWidth < config.deviceBreakpoints.smartphone) {
            return "smartphone";
        } else if (viewportWidth < config.deviceBreakpoints.tablet) {
            return "tablet";
        } else {
            return "desktop";
        }
    }, [viewportWidth]);

    const [deviceClass, setDeviceClass] = useState(getDeviceClass());

    useEffect(() => {
        setDeviceClass(getDeviceClass());
    }, [getDeviceClass, viewportWidth]);

    return deviceClass;
};

export const usePrevious = <T extends unknown>(value: T, initialValue?: T) => {
    const valueRef = useRef(initialValue);

    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    return valueRef.current;
};
