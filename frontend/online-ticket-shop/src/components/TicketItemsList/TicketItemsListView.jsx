import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

import styles from './TicketItemsListStyles';
import TicketItemController from '../TicketItem/TicketItemController';
// import { sampleData } from '../../helpers/sampleData';

const TicketItemsListView = (props) => {
    const { data, title, itemsType } = props;

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
                    ' @media only screen and (max-width: 600px)': {
                        paddingLeft: '12rem',
                    },
                }}
            >
                {data?.map((item, index) => (
                    <React.Fragment key={index}>
                        <TicketItemController
                            item={item}
                            itemsType={itemsType}
                        />
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
    data: PropTypes.array.isRequired,
    itemsType: PropTypes.string.isRequired,
};
