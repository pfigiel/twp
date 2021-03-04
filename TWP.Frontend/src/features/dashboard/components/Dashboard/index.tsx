import config from "config";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
    const history = useHistory();

    return (
        <div>
            <button onClick={() => history.push(config.appRoutes.landingPage)}>Go to landing page</button>
        </div>
    );
};

export default Dashboard;
