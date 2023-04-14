import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

import styles from './TicketItemsListStyles';
import TicketItemController from '../TicketItem/TicketItemController';

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

const TicketItemsListView = (props) => {
    const { items, title } = props;
    console.log('%c Line:10 🍯 items', 'color:#6ec1c2', items);

    //using tailwindcss
    return (
        <Box className={styles.tailwind.container}>
            <Box className={styles.tailwind.header}>
                <Typography className="font-bold" variant="h6">
                    {title}
                </Typography>
            </Box>
            <Box
                className={styles.tailwind.mainContainer}
                sx={{
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}
            >
                {sampleData.map((item, index) => (
                    <React.Fragment key={index}>
                        <TicketItemController item={item} />
                    </React.Fragment>
                ))}
            </Box>
        </Box>
    );
};

export default TicketItemsListView;
TicketItemsListView.propTypes = {
    items: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
};
