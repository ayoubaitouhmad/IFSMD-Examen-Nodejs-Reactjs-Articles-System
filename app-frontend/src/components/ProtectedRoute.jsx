import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import {useAuth} from "../contexts/AuthContext";

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const {user}  = useAuth();

    useEffect(() => {
        if (isAuthenticated !== undefined) {
            setLoading(false);
        }
    }, [isAuthenticated]);

    // console.log(user)
    if (loading) {
        return <div>Loading...</div>; // Show a loading state while determining authentication
    }

    return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
