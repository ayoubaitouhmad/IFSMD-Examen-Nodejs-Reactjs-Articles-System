import React, {createContext, useState, useEffect, useContext} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = (userToken, userData) => {
        setToken(userToken);
        setUser(userData);
        localStorage.setItem('token', userToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAuthenticated(true);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
    };
    return (
        <AuthContext.Provider value={{ token, setToken, isAuthenticated, login, logout  , user}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    return useContext(AuthContext);
};