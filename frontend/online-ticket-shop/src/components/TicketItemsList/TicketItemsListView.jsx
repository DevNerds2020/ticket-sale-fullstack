import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

import styles from './TicketItemsListStyles';
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

const TicketItemsListView = (props) => {
    const { items } = props;
    console.log('%c Line:10 🍯 items', 'color:#6ec1c2', items);

    return (
        <Box className={styles.mainContainer}>
            {sampleData.map((item, index) => (
                <React.Fragment key={index}>
                    <TicketItemView item={item} />
                </React.Fragment>
            ))}
        </Box>
    );
};

export default TicketItemsListView;
TicketItemsListView.propTypes = {
    items: PropTypes.array.isRequired,
};
