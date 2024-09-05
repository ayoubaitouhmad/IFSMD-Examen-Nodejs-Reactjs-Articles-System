import React, {createContext, useState, useEffect, useContext} from 'react';
import {getUserById, getUserByUsername} from "../services/userService";

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

    const updateUser = async () => {
        const authorData = await getUserById(user.id);
        setUser(authorData);
        localStorage.setItem('user', JSON.stringify(authorData));
    }
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
        <AuthContext.Provider value={{ token, setToken, isAuthenticated, login, logout  , user , setUser , updateUser}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    return useContext(AuthContext);
};