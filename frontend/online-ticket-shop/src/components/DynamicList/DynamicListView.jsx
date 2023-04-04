import React, { useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import styles from './DynamicListStyles';
import TicketItemView from '../TicketItem/TicketItemView';
import Container from '../CustomComponents/Container';

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

const DynamicListView = () => {
    const [data, setData] = useState(sampleData);

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
        <Container>
            <Box className={styles.pageContainer}>
                <Box className={styles.filterContainer}>
                    {/*filters have this fields:
                    - destination city
                    - departure city
                    - departure date
                    - return date
                    - number of passengers 
                    */}
                    <Typography variant="h6" mb={5}>
                        filters
                    </Typography>
                    <TextField
                        InputProps={{
                            className: styles.filterInputs,
                        }}
                        label="destination city"
                        type="text"
                        onChange={(e) => {
                            handleFilterChange(e);
                        }}
                        name="destinationCity"
                    />
                    <TextField
                        InputProps={{
                            className: styles.filterInputs,
                        }}
                        label="departure city"
                        type="text"
                        onChange={(e) => {
                            handleFilterChange(e);
                        }}
                        name="departureCity"
                    />

                    <TextField
                        InputProps={{
                            className: styles.filterInputs,
                        }}
                        label="number of passengers"
                        type="number"
                        onChange={(e) => {
                            handleFilterChange(e);
                        }}
                        name="numberOfPassengers"
                    />
                </Box>
                <Box className={styles.container}>
                    <Box className={styles.header}>
                        <Typography variant="h6">tickets</Typography>
                    </Box>
                    <Box className={styles.mainContainer}>
                        {data.map((item, index) => (
                            <React.Fragment key={index}>
                                <TicketItemView item={item} />
                            </React.Fragment>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default DynamicListView;
