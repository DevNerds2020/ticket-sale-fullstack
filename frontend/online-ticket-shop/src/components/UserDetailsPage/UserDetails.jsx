import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import Container from '../CustomComponents/Container';
import styles from '../../globalStyles';
import ResponsiveAppBar from '../CustomComponents/ResponsiveAppBar';
import { translations } from '../../utils/translations';
import { editUser } from '../../redux/userSlice';
import customTypography from '../../cssdesigns';
import { API_URL } from '../../../config';
import { toast } from 'react-toastify';

//TODO: some smart validations with regex needed (maybe in the future) not now
const UserDetails = () => {
    const { user } = useSelector((state) => state.userReducer);
    const { language, theme } = useSelector((state) => state.webReducer);
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
    console.log('%c Line:40 🍋 userForm', 'color:#93c0a4', userForm);
    const [appUsers, setAppUsers] = useState([]);

    useEffect(() => {
        setUserForm({ ...user });
    }, [user]);

    /**
     * @function handleChange
     * @param {*} e
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserForm((prev) => ({ ...prev, [name]: value }));
    };

    /**
     * @function updateUserInAPI
     * @returns {void}
     */
    const updateUserInAPI = async () => {
        const response = await fetch(`${API_URL}/users/${userForm.id}`, {
            method: 'PUT',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userForm),
        });
        const data = await response.json();
        return data;
    };

    /**
     * @function handleSubmit
     * @param {*} e
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await updateUserInAPI();
        if (data?.status === 'success') {
            dispatch(editUser(userForm));
            toast.success(translations[language].userUpdatedSuccessfully);
        } else {
            toast.error(translations[language].userUpdatedFailed);
        }
    };

    /**
     * @function handleGetUsersFromApi
     * @returns {void}
     */
    const handleGetUsersFromApi = async () => {
        const response = await fetch(`${API_URL}/users`, {
            method: 'GET',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
            console.log('%c Line:101 🥝 data', 'color:#b03734', data);
            setAppUsers([...data]);
        }
    };

    return (
        <>
            <ResponsiveAppBar />
            <Container>
                {userForm.is_admin && (
                    <>
                        <h1>welcome admin</h1>
                        <Button onClick={handleGetUsersFromApi}>
                            show all the users
                        </Button>
                        {appUsers.length > 0 && (
                            <>
                                {appUsers.map((appUser) => {
                                    return (
                                        <p key={appUser.id}>
                                            {appUser.name}--{appUser.phone}--
                                            {appUser.email}
                                        </p>
                                    );
                                })}
                                <Button
                                    onClick={() => {
                                        setAppUsers([]);
                                    }}
                                >
                                    clear
                                </Button>
                            </>
                        )}
                    </>
                )}
                <form onSubmit={handleSubmit}>
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
                        value={userForm?.national_id ?? ''}
                        mb={2}
                        InputProps={{ className: styles.input }}
                        type="text"
                        name="national_id"
                        dir={language === 'en' ? 'ltr' : 'rtl'}
                    />
                    <TextField
                        label={translations[language].passportId}
                        onChange={handleChange}
                        fullWidth
                        value={userForm?.passport_id ?? ''}
                        mb={2}
                        InputProps={{ className: styles.input }}
                        type="number"
                        name="passport_id"
                        dir={language === 'en' ? 'ltr' : 'rtl'}
                    />
                    <TextField
                        label={translations[language].birth_date}
                        type="date"
                        name="birth_date"
                        value={userForm?.birth_date ?? ''}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        InputProps={{ className: styles.input }}
                        mb={2}
                        dir={language === 'en' ? 'ltr' : 'rtl'}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',
                            mb: 2,
                        }}
                        dir={language === 'en' ? 'ltr' : 'rtl'}
                    >
                        <Select
                            name="gender"
                            value={userForm?.gender ?? ''}
                            label={translations[language].gender}
                            onChange={handleChange}
                            fullWidth
                            className={styles.input}
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
                    <Button
                        sx={{
                            marginTop: `${customTypography.smallSpacing}px`,
                            background: `${theme}`,
                        }}
                        variant="contained"
                        type="submit"
                        fullWidth
                    >
                        {translations[language].submit}
                    </Button>
                </form>
            </Container>
        </>
    );
};

export default UserDetails;
