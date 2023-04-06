import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import PasswordStrengthBar from 'react-password-strength-bar';

import Container from '../CustomComponents/Container';
import styles from '../../globalStyles';
import { css } from '@emotion/css';
import { translations } from '../../utils/translations';

// getting email and password and re enter password and phone number
const SignUpView = (props) => {
    const { handleChange, handleSubmit, formData, language } = props;
    return (
        <Container>
            <Typography variant="h3" mb={4} mt={4}>
                {translations[language].signUp}
            </Typography>
            <form className={styles.form} onSubmit={handleSubmit}>
                <TextField
                    label={translations[language].email}
                    type="email"
                    name="email"
                    required
                    className={styles.input}
                    InputProps={{
                        className: styles.input,
                    }}
                    onChange={handleChange}
                />
                <TextField
                    label={translations[language].password}
                    type="password"
                    name="password"
                    required
                    className={styles.input}
                    InputProps={{
                        className: styles.input,
                    }}
                    onChange={handleChange}
                />
                {formData.password && (
                    <PasswordStrengthBar
                        className={css`
                            margin: 0 auto;
                            width: 10rem;
                        `}
                        password={formData.password}
                    />
                )}
                <TextField
                    label={translations[language].email}
                    type="password"
                    name="re-enter-password"
                    required
                    className={styles.input}
                    InputProps={{
                        className: styles.input,
                    }}
                    onChange={handleChange}
                />
                <TextField
                    label={translations[language].phoneNumber}
                    name="phone-number"
                    type="tel"
                    required
                    InputProps={{
                        className: styles.input,
                    }}
                    onChange={handleChange}
                />
                <Button variant="contained" type="submit">
                    {translations[language].submit}
                </Button>
            </form>
        </Container>
    );
};

export default SignUpView;

SignUpView.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
};
