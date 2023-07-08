import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import DynamicListView from './DynamicListView';
import { useEffect } from 'react';
// import { sampleData } from '../../helpers/sampleData';

const DynamicListController = () => {
    const [data, setData] = useState();
    const [pageMeta, setPageMeta] = useState({
        currentPage: 1,
        pagename: 'hotelReservation',
    });

    const { language } = useSelector((state) => state.webReducer);
    const { tickets } = useSelector((state) => state.webReducer);
    const defaultDataRef = useRef();

    const isSorted = useRef(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/hotelreservations') {
            setPageMeta({
                currentPage: 1,
                pagename: 'hotelReservation',
                itemsType: 'hotel',
            });
            setData(tickets.hotel_tickets);
            defaultDataRef.current = tickets.hotel_tickets;
        } else if (location.pathname === '/airplanetickets') {
            setPageMeta({
                currentPage: 1,
                pagename: 'airplaneTickets',
                itemsType: 'airplane',
            });
            setData(tickets.airplane_tickets);
            defaultDataRef.current = tickets.airplane_tickets;
        } else if (location.pathname === '/traintickets') {
            setPageMeta({
                currentPage: 1,
                pagename: 'trainTickets',
                itemsType: 'train',
            });
            setData(tickets.train_tickets);
            defaultDataRef.current = tickets.train_tickets;
        }
    }, [location.pathname]);

    /**
     * @function handleFilterChange
     * @param e event
     * @returns void
     * @description filter data based on input value
     */
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (!value) {
            setData(defaultDataRef.current);
            return;
        }

        const dataToFilter = data.length === 0 ? defaultDataRef.current : data;
        const filteredData = dataToFilter.filter((item) => {
            if (
                item[name]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
            ) {
                return item;
            }
        });
        setData(filteredData);
    };

    /**
     * @function handleSortByCheapest
     * @returns void
     * @description sort data based on price
     */
    const handleSortByCheapest = useCallback(() => {
        if (isSorted.current) {
            setData(defaultDataRef.current);
            isSorted.current = false;
            return;
        }
        const dataToSort = defaultDataRef.current.map((item) => item);
        const sortedData = dataToSort.sort((a, b) => a.price - b.price);
        setData([...sortedData]);
        isSorted.current = true;
    }, []);

    /**
     * @function clearFilters
     * @returns void
     * @description clear sort and filters
     */
    const clearFilters = useCallback(() => {
        setData(defaultDataRef.current);
        isSorted.current = false;
    }, []);

    return (
        <DynamicListView
            language={language}
            pageMeta={pageMeta}
            data={data}
            handleSortByCheapest={handleSortByCheapest}
            handleFilterChange={handleFilterChange}
            clearFilters={clearFilters}
        />
    );
};

export default DynamicListController;
