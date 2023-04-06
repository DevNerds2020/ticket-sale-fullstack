import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { HomeController } from './components/HomePage/HomeController';
import LoginController from './components/LoginPage/LoginController';
import SignUpController from './components/SignUpPage/SignUpController';
import UserDetails from './components/UserDetailsPage/UserDetails';
import DynamicListController from './components/DynamicList/DynamicListController';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeController />,
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
        element: <DynamicListController />,
    },
    {
        path: '/traintickets',
        element: <DynamicListController />,
    },
    {
        path: '/hotelreservations',
        element: <DynamicListController />,
    },
    {
        path: '/accountinfo',
        element: <UserDetails />,
    },
]);

export default router;
