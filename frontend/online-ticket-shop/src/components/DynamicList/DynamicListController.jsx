import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import DynamicListView from './DynamicListView';
import { useEffect } from 'react';
import { sampleData } from '../../helpers/sampleData';

//TODO buttons not working good

const DynamicListController = () => {
    const [data, setData] = useState(sampleData);
    const [isSorted, setIsSorted] = useState(false);
    const { language } = useSelector((state) => state.webReducer);
    const [pageMeta, setPageMeta] = useState({
        currentPage: 1,
        pagename: 'hotelReservation',
    });

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/hotelreservations') {
            setPageMeta({
                currentPage: 1,
                pagename: 'hotelReservation',
            });
        } else if (location.pathname === '/airplanetickets') {
            setPageMeta({
                currentPage: 1,
                pagename: 'airplaneTickets',
            });
        } else if (location.pathname === '/traintickets') {
            setPageMeta({
                currentPage: 1,
                pagename: 'trainTickets',
            });
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
        const dataToFilter = data.length === 0 ? sampleData : data;
        const filteredData = dataToFilter.filter((item) => {
            if (item[name].toString().includes(value)) {
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
    const handleSortByCheapest = () => {
        if (isSorted) {
            setData([...sampleData]);
            setIsSorted(false);
        } else {
            const sortedData = sampleData.sort((a, b) => a.price - b.price);
            setData(sortedData);
            setIsSorted(true);
        }
    };

    return (
        <DynamicListView
            language={language}
            data={data}
            pageMeta={pageMeta}
            handleFilterChange={handleFilterChange}
            clearFilters={() => setData(sampleData)}
            handleSortByCheapest={handleSortByCheapest}
        />
    );
};

export default DynamicListController;
