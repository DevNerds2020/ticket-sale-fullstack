import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import InfoIcon from '@mui/icons-material/Info';

import styles from './TicketItemStyles';
import { translations } from '../../utils/translations';

const TicketItemView = (props) => {
    const { item } = props;

    const { language, theme } = useSelector((state) => state.webReducer);

    return (
        <Box className={styles.mainContainer}>
            <img
                height={150}
                width={150}
                src="https://picsum.photos/200/300"
                alt="ticket"
            />
            <p>{item.title}</p>
            <p>{item.price}</p>
            <Box className={styles.buttonsContainer}>
                <Button
                    className={styles.submitButton}
                    sx={{ background: `${theme}` }}
                    variant="contained"
                >
                    {translations[language].buy}
                </Button>
                <Button
                    className={styles.detailButton}
                    sx={{ color: `${theme}` }}
                    variant="outlined"
                    startIcon={<InfoIcon />}
                />
            </Box>
        </Box>
    );
};

export default TicketItemView;
TicketItemView.propTypes = {
    item: PropTypes.object.isRequired,
};
