import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HomeView } from './HomeView';
import { API_URL } from '../../../config';
import { addTickets } from '../../redux/webSlice';
import Loading from '../CustomComponents/Loading';
import { toast } from 'react-toastify';
import { translations } from '../../utils/translations';

export const HomeController = () => {
    const { language } = useSelector((state) => state.webReducer) || 'en';
    const { tickets } = useSelector((state) => state.webReducer);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    /**
     * @function getTicketsFromApi
     * @returns {void}
     */
    const getTicketsFromApi = useCallback(async () => {
        try {
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
        } catch (error) {
            toast.error(translations[language].errorFromApiDataIsCache);
            console.error(error);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        getTicketsFromApi();
    }, []);

    if (loading) return <Loading />;

    return <HomeView tickets={tickets} language={language} />;
};
