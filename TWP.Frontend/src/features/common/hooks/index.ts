import { useEffect } from "react";

export const useOnResizeListener = (callback: () => void) => {
    useEffect(() => {
        window.addEventListener("resize", callback);

        return () => window.removeEventListener("resize", callback);
    });
};
