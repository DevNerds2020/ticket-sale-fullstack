import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import DynamicListView from './DynamicListView';
import { useEffect } from 'react';

//TODO buttons not working good
const sampleData = [
    {
        id: 1,
        title: 'Ticket 1',
        price: 100,
        destinationCity: 'New York',
        departureCity: 'London',
        departureDate: '2021-10-10',
        returnDate: '2021-10-20',
        numberOfPassengers: 2,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
        destinationCity: 'New York',
        departureCity: 'London',
        departureDate: '2021-10-10',
        returnDate: '2021-10-20',
        numberOfPassengers: 2,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
        destinationCity: 'mashhad',
        departureCity: 'London',
        departureDate: '2022-10-10',
        returnDate: '2022-10-20',
        numberOfPassengers: 2,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
        destinationCity: 'New York',
        departureCity: 'London',
        departureDate: '2021-10-10',
        returnDate: '2021-10-20',
        numberOfPassengers: 10,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
        destinationCity: 'tehran',
        departureCity: 'ghazvin',
        departureDate: '2021-10-10',
        returnDate: '2020-12-10',
        numberOfPassengers: 2,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
        destinationCity: 'esfahan',
        departureCity: 'tehran',
        departureDate: '2021-10-10',
        returnDate: '2021-10-20',
        numberOfPassengers: 5,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
        destinationCity: 'esfahan',
        departureCity: 'tehran',
        departureDate: '2021-10-10',
        returnDate: '2021-10-20',
        numberOfPassengers: 5,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
        destinationCity: 'esfahan',
        departureCity: 'tehran',
        departureDate: '2021-10-10',
        returnDate: '2021-10-20',
        numberOfPassengers: 5,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
        destinationCity: 'esfahan',
        departureCity: 'tehran',
        departureDate: '2021-10-10',
        returnDate: '2021-10-20',
        numberOfPassengers: 5,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
        destinationCity: 'esfahan',
        departureCity: 'tehran',
        departureDate: '2021-10-10',
        returnDate: '2021-10-20',
        numberOfPassengers: 5,
    },
    {
        id: 2,
        title: 'Ticket test cheap',
        price: 50,
        destinationCity: 'esfahan',
        departureCity: 'tehran',
        departureDate: '2021-10-10',
        returnDate: '2021-10-20',
        numberOfPassengers: 5,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 100,
        destinationCity: 'esfahan',
        departureCity: 'tehran',
        departureDate: '2021-10-10',
        returnDate: '2021-10-20',
        numberOfPassengers: 5,
    },
];

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
