import React from 'react';
import { Box } from '@mui/material';
import { css } from '@emotion/css';
import PropTypes from 'prop-types';
import ResponsiveAppBar from './ResponsiveAppBar';
import Footer from '../Footer/Footer';

const Container = ({ children }) => {
    return (
        <>
            <ResponsiveAppBar />
            <Box
                className={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    padding: 1rem;
                    margin-top: 1rem;
                `}
            >
                {children}
            </Box>
            <Footer />
        </>
    );
};

export default Container;

Container.propTypes = {
    children: PropTypes.node.isRequired,
};
