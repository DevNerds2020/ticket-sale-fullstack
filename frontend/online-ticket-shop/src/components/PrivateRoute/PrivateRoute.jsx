import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
    const { user } = useSelector((state) => state.userReducer);
    if (!user?.id) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.func.isRequired,
};
