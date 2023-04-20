import React, { useState, useEffect } from 'react';
import { Box, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import Container from '../CustomComponents/Container';
import styles from '../../globalStyles';
import ResponsiveAppBar from '../CustomComponents/ResponsiveAppBar';
import { translations } from '../../utils/translations';
import { editUser } from '../../redux/userSlice';

//TODO: some smart validations with regex needed
const UserDetails = () => {
    const { user } = useSelector((state) => state.userReducer);
    const { language } = useSelector((state) => state.webReducer);
    const dispatch = useDispatch();
    // const regexValidationFieldsFormat = {
    //     name: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    //     email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //     phone: /^(\+972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/,
    //     address: /^[a-zA-Z0-9\s,'-]*$/,
    //     city: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
    //     state: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
    //     zip: /^\d{5}(?:[-\s]\d{4})?$/,
    //     country: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
    //     nationalId: /^[0-9]{9}$/,
    //     passportId: /^[0-9]{9}$/,
    // };

    const [userForm, setUserForm] = useState({ ...user });

    useEffect(() => {
        setUserForm({ ...user });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name) dispatch(editUser({ ...userForm, [name]: value }));
    };

    return (
        <>
            <ResponsiveAppBar />
            <Container>
                <Typography variant="h5" mb={2} mt={5}>
                    {translations[language].userinformations}
                </Typography>

                <TextField
                    label={translations[language].name}
                    fullWidth
                    onChange={handleChange}
                    mb={2}
                    value={userForm?.name ?? ''}
                    InputProps={{ className: styles.input }}
                    type="text"
                    name="name"
                    dir={language === 'en' ? 'ltr' : 'rtl'}
                />
                <TextField
                    label={translations[language].email}
                    fullWidth
                    onChange={handleChange}
                    value={userForm?.email ?? ''}
                    mb={2}
                    InputProps={{ className: styles.input }}
                    type="email"
                    name="email"
                    dir={language === 'en' ? 'ltr' : 'rtl'}
                />
                <TextField
                    label={translations[language].phone}
                    fullWidth
                    onChange={handleChange}
                    value={userForm?.phone ?? ''}
                    mb={2}
                    InputProps={{ className: styles.input }}
                    type="tel"
                    name="phone"
                    dir={language === 'en' ? 'ltr' : 'rtl'}
                />
                <TextField
                    label={translations[language].address}
                    fullWidth
                    onChange={handleChange}
                    value={userForm?.address ?? ''}
                    mb={2}
                    InputProps={{ className: styles.input }}
                    type="text"
                    name="address"
                    dir={language === 'en' ? 'ltr' : 'rtl'}
                />
                <TextField
                    label={translations[language].city}
                    fullWidth
                    onChange={handleChange}
                    value={userForm?.city ?? ''}
                    mb={2}
                    InputProps={{ className: styles.input }}
                    type="text"
                    name="city"
                    dir={language === 'en' ? 'ltr' : 'rtl'}
                />
                <TextField
                    label={translations[language].state}
                    fullWidth
                    onChange={handleChange}
                    value={userForm?.state ?? ''}
                    mb={2}
                    InputProps={{ className: styles.input }}
                    type="text"
                    name="state"
                    dir={language === 'en' ? 'ltr' : 'rtl'}
                />
                <TextField
                    label={translations[language].zip}
                    fullWidth
                    onChange={handleChange}
                    value={userForm?.zip ?? ''}
                    mb={2}
                    InputProps={{ className: styles.input }}
                    type="number"
                    name="zip"
                    dir={language === 'en' ? 'ltr' : 'rtl'}
                />
                <TextField
                    label={translations[language].country}
                    fullWidth
                    onChange={handleChange}
                    value={userForm?.country ?? ''}
                    mb={2}
                    InputProps={{ className: styles.input }}
                    type="text"
                    name="country"
                    dir={language === 'en' ? 'ltr' : 'rtl'}
                />
                <TextField
                    label={translations[language].nationalId}
                    fullWidth
                    onChange={handleChange}
                    value={userForm?.nationalId ?? ''}
                    mb={2}
                    InputProps={{ className: styles.input }}
                    type="text"
                    name="nationalId"
                    dir={language === 'en' ? 'ltr' : 'rtl'}
                />
                <TextField
                    label={translations[language].passportId}
                    onChange={handleChange}
                    fullWidth
                    value={userForm?.passportId ?? ''}
                    mb={2}
                    InputProps={{ className: styles.input }}
                    type="number"
                    name="passportId"
                    dir={language === 'en' ? 'ltr' : 'rtl'}
                />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        mb: 2,
                    }}
                    dir={language === 'en' ? 'ltr' : 'rtl'}
                >
                    <Typography sx={{ minWidth: 100 }}>
                        {translations[language].gender}
                    </Typography>
                    <Select
                        name="gender"
                        value={userForm?.gender ?? ''}
                        label={translations[language].gender}
                        onChange={handleChange}
                        dir={language === 'en' ? 'ltr' : 'rtl'}
                    >
                        <MenuItem value="male">
                            {translations[language].male}
                        </MenuItem>
                        <MenuItem value="female">
                            {translations[language].female}
                        </MenuItem>
                        <MenuItem value="other">
                            {translations[language].other}
                        </MenuItem>
                    </Select>
                </Box>

                <TextField
                    label={translations[language].birthdate}
                    type="date"
                    name="birthdate"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    mb={2}
                    dir={language === 'en' ? 'ltr' : 'rtl'}
                />
            </Container>
        </>
    );
};

export default UserDetails;
