import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (userToken) => {
        setToken(userToken);
        localStorage.setItem('token', userToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ token, setToken, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
