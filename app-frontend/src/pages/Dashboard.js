import { useContext } from "react";
import {AuthContext} from "../components/AuthContext";

function Dashboard() {
    const { isAuthenticated } = useContext(AuthContext);


    console.log(isAuthenticated) // first load its true second is false
    // if (!isAuthenticated) {
    //     return <Navigate to="/login" replace />;
    // }

    return <h1>Dashboard: Protected Content Here</h1>;
}

export default Dashboard;