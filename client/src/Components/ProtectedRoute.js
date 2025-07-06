import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const { isAuthenticated, role, token, userId } = useAuth();

    // Wait until token is fully checked before rendering
    if (token === null || userId === null) {
        return <div>Loading...</div>; // You could show a loading spinner or a placeholder
    }

    // Check if authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Check if the role is allowed
    if (allowedRoles && (!role || !allowedRoles.includes(role))) {
        return <Navigate to="/unauthorized" />; // Redirect to unauthorized page
    }

    // Render the element if authenticated and authorized
    return element;
};

export default ProtectedRoute;
