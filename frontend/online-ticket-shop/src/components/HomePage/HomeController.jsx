import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HomeView } from './HomeView';
import { API_URL } from '../../../config';
import { addTickets } from '../../redux/webSlice';

export const HomeController = () => {
    const { language } = useSelector((state) => state.webReducer) || 'en';
    const { tickets } = useSelector((state) => state.webReducer);
    const dispatch = useDispatch();

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
        if (data.data) {
            dispatch(addTickets(data.data));
        }
    };

    useEffect(() => {
        getTicketsFromApi();
    }, []);

    return <HomeView tickets={tickets} language={language} />;
};
