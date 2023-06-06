import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { HomeView } from './HomeView';
import { API_URL } from '../../../config';

export const HomeController = () => {
    const { language } = useSelector((state) => state.webReducer) || 'en';

    const getTicketsFromApi = async () => {
        const url = `${API_URL}/tickets/all`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log(data);
    };

    useEffect(() => {
        getTicketsFromApi();
    }, []);

    return <HomeView language={language} />;
};
