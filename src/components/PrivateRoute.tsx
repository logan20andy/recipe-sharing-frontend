import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    component: React.ComponentType;
    [key: string]: unknown; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token');

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
