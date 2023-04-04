import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { HomeController } from './components/HomePage/HomeController';
import LoginController from './components/LoginPage/LoginController';
import SignUpController from './components/SignUpPage/SignUpController';
import DynamicListView from './components/DynamicList/DynamicListView';
import UserDetails from './components/UserDetailsPage/UserDetails';

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
        path: '/dl',
        element: <DynamicListView />,
    },

    {
        path: '/accountinfo',
        element: <UserDetails />,
    },
]);

export default router;
