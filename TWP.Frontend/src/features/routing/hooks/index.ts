import { useEffect, useState } from "react";
import { useHistory } from "react-router";

export const useCurrentRoute = () => {
    const history = useHistory();
    const [route, setRoute] = useState(history.location.pathname);

    useEffect(() => {
        const stopListening = history.listen((listener) => setRoute(listener.pathname));

        return () => stopListening();
    });

    return route;
};
