import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import ResponsiveAppBar from '../CustomComponents/ResponsiveAppBar';
import styles from './DynamicListStyles';
import TicketItemView from '../TicketItem/TicketItemView';

const sampleData = [
    {
        id: 1,
        title: 'Ticket 1',
        price: 100,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
    },
    {
        id: 2,
        title: 'Ticket 2',
        price: 200,
    },
];

const DynamicListView = () => {
    return (
        <Box>
            <ResponsiveAppBar />
            <Box className={styles.pageContainer}>
                <Box className={styles.filterContainer}>
                    {/*filters have this fields:
                    - destination city
                    - departure city
                    - departure date
                    - return date
                    - number of passengers 
                    */}
                    <Typography variant="h6">filters</Typography>
                    <TextField
                        InputProps={{
                            className: styles.filterInputs,
                        }}
                        label="destination city"
                        type="text"
                    />
                    <TextField
                        InputProps={{
                            className: styles.filterInputs,
                        }}
                        label="departure city"
                        type="text"
                    />

                    <TextField
                        InputProps={{
                            className: styles.filterInputs,
                        }}
                        label="number of passengers"
                        type="number"
                    />
                </Box>
                <Box className={styles.container}>
                    <Box className={styles.header}>
                        <Typography variant="h6">tickets</Typography>
                    </Box>
                    <Box className={styles.mainContainer}>
                        {sampleData.map((item, index) => (
                            <React.Fragment key={index}>
                                <TicketItemView item={item} />
                            </React.Fragment>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default DynamicListView;
