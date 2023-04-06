import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import Container from '../CustomComponents/Container';
import styles from '../../globalStyles';
import { translations } from '../../utils/translations';
import { Link } from 'react-router-dom';
import customTypography from '../../cssdesigns';

// phone number or email and password
export const LoginView = (props) => {
    const { handleChange, handleSubmit, language, theme } = props;
    return (
        <Container>
            <Typography variant="h3" mb={4} mt={4}>
                {translations[language].login}
            </Typography>

            <form className={styles.form} onSubmit={handleSubmit}>
                <TextField // email or phone number field here
                    label={translations[language].emailOrPhoneNumber}
                    type="username"
                    name="username"
                    required
                    InputProps={{
                        className: styles.input,
                    }}
                    onChange={handleChange}
                />
                <TextField // password field here
                    label={translations[language].password}
                    type="password"
                    name="password"
                    required
                    InputProps={{
                        className: styles.input,
                    }}
                    onChange={handleChange}
                />
                <Link to="/signup">{translations[language].signUp}</Link>
                <Button
                    sx={{
                        marginTop: `${customTypography.smallSpacing}px`,
                        background: `${theme}`,
                    }}
                    variant="contained"
                    type="submit"
                >
                    {translations[language].submit}
                </Button>
            </form>
        </Container>
    );
};

LoginView.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
};
