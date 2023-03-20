import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { HomeController } from './components/HomePage/HomeController';
import LoginController from './components/LoginPage/LoginController';
import SignUpController from './components/SignUpPage/SignUpController';

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
]);

export default router;
