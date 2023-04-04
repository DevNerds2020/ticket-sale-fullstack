import React from 'react';
import { TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import Container from '../CustomComponents/Container';
import styles from '../../globalStyles';

// phone number or email and password
export const LoginView = (props) => {
    const { handleChange, handleSubmit } = props;
    return (
        <Container>
            <Typography variant="h3" mb={4} mt={4}>
                Log In
            </Typography>

            <form className={styles.form} onSubmit={handleSubmit}>
                <TextField // email or phone number field here
                    label="Email or Phone Number"
                    type="username"
                    name="username"
                    required
                    InputProps={{
                        className: styles.input,
                    }}
                    onChange={handleChange}
                />
                <TextField // password field here
                    label="Password"
                    type="password"
                    name="password"
                    required
                    InputProps={{
                        className: styles.input,
                    }}
                    onChange={handleChange}
                />
            </form>
        </Container>
    );
};

LoginView.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
};
