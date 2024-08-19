import React from 'react';
import {Navigate} from "react-router-dom";

function Logout() {

    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
}

export default Logout;