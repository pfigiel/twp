import routes from "features/routing/utils/routes";
import { Switch } from "react-router";
import { Route } from "react-router-dom";

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
