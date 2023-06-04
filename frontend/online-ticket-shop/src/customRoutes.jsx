import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { HomeController } from './components/HomePage/HomeController';
import LoginController from './components/LoginPage/LoginController';
import SignUpController from './components/SignUpPage/SignUpController';
import UserDetails from './components/UserDetailsPage/UserDetails';
import DynamicListController from './components/DynamicList/DynamicListController';
import UserReservationsView from './components/UserReservations/UserReservationsView';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <PrivateRoute>
                <HomeController />
            </PrivateRoute>
        ),
    },
    {
        path: '/login',
        element: <LoginController />,
    },
    {
        path: '/signup',
        element: <SignUpController />,
    },
    {
        path: '/ticket/:id',
    },

    {
        path: '/airplanetickets',
        element: (
            <PrivateRoute>
                <DynamicListController />
            </PrivateRoute>
        ),
    },
    {
        path: '/traintickets',
        element: (
            <PrivateRoute>
                <DynamicListController />
            </PrivateRoute>
        ),
    },
    {
        path: '/hotelreservations',
        element: (
            <PrivateRoute>
                <DynamicListController />
            </PrivateRoute>
        ),
    },
    {
        path: '/accountinfo',
        element: (
            <PrivateRoute>
                <UserDetails />
            </PrivateRoute>
        ),
    },
    {
        path: '/reservations',
        element: (
            <PrivateRoute>
                <UserReservationsView />
            </PrivateRoute>
        ),
    },
]);

export default router;
