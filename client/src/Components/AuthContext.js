import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);  
    const [role, setRole] = useState(null);  
    const [token, setToken] = useState(null);  
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Retrieve token, role, and userId from local storage
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');
        const storedUserId = localStorage.getItem('userId');

        if (storedToken && storedRole && storedUserId) {
            setIsAuthenticated(true);
            setToken(storedToken);
            setRole(storedRole);
            setUserId(storedUserId);
        } else {
            setIsAuthenticated(false);
        }
    }, []); // Only run on initial load

    const login = (token, userRole, userId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', userRole);
        localStorage.setItem('userId', userId);
        setIsAuthenticated(true);
        setToken(token);
        setRole(userRole);
        setUserId(userId);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        setIsAuthenticated(false);
        setToken(null);
        setRole(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, token, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
