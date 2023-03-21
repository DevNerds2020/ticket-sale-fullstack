import React from 'react';
import { Box } from '@mui/material';
import { css } from '@emotion/css';
import PropTypes from 'prop-types';

const Container = ({ children }) => {
    return (
        <Box
            className={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                padding: 1rem;
            `}
        >
            {children}
        </Box>
    );
};

export default Container;

Container.propTypes = {
    children: PropTypes.node.isRequired,
};
