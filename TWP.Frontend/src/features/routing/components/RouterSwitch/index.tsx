import { routes } from "features/routing/constants/routes";
import { Switch, Route } from "react-router-dom";

const RouterSwitch = () => (
    <Switch>
        {routes.map((route) => (
            <Route exact={route.exact} path={route.path} key={route.path}>
                {route.component}
            </Route>
        ))}
    </Switch>
);

export default RouterSwitch;
