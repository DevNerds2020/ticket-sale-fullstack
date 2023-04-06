import React, { useState } from 'react';
import DynamicListView from './DynamicListView';

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
];

const DynamicListController = () => {
    const [data, setData] = useState(sampleData);

    /**
     * @function handleFilterChange
     * @param e event
     * @returns void
     * @description filter data based on input value
     */
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const filteredData = sampleData.filter((item) => {
            if (item[name].toString().includes(value)) {
                return item;
            }
        });
        setData(filteredData);
    };

    return (
        <DynamicListView data={data} handleFilterChange={handleFilterChange} />
    );
};

export default DynamicListController;
