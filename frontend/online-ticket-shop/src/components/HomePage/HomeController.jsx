import React from 'react';
import { useSelector } from 'react-redux';

import { HomeView } from './HomeView';

export const HomeController = () => {
    const { language } = useSelector((state) => state.webReducer) || 'en';

    return <HomeView language={language} />;
};
