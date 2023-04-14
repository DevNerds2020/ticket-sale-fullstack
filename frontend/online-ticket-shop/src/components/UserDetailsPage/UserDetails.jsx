import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import Container from '../CustomComponents/Container';
import styles from '../../globalStyles';
import ResponsiveAppBar from '../CustomComponents/ResponsiveAppBar';
import { translations } from '../../utils/translations';
import { editUser } from '../../redux/userSlice';

//TODO: => gender haves a bug
const UserDetails = () => {
    const { user } = useSelector((state) => state.userReducer);
    const { language } = useSelector((state) => state.webReducer);
    const dispatch = useDispatch();

    const [userForm, setUserForm] = useState({ ...user });

    useEffect(() => {
        setUserForm({ ...user });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(editUser({ ...userForm, [name]: value }));
    };

    return (
        <>
            <ResponsiveAppBar />
            <Container>
                <Typography variant="h5" mb={2} mt={5}>
                    {translations[language].userinformations}
                </Typography>

                <TextField
                    label="Name"
                    fullWidth
                    onChange={handleChange}
                    mb={2}
                    value={userForm?.name ?? ''}
                    InputProps={{ className: styles.input }}
                    type="text"
                    name="name"
                />
                <TextField
                    label="Email"
                    fullWidth
                    onChange={handleChange}
                    value={userForm?.email ?? ''}
                    mb={2}
                    InputProps={{ className: styles.input }}
                    type="email"
                    name="email"
                />
                <TextField
                    label="Phone"
                    fullWidth
                    onChange={handleChange}
                    value={userForm?.phone ?? ''}
                    mb={2}
                    InputProps={{ className: styles.input }}
                    type="tel"
                    name="phone"
                />
                <TextField
                    label="Address"
                    fullWidth
                    onChange={handleChange}
                    value={userForm?.address ?? ''}
                    mb={2}
                    InputProps={{ className: styles.input }}
                    type="text"
                    name="address"
                />
                <TextField
                    label="City"
                    fullWidth
                    onChange={handleChange}
                    value={userForm?.city ?? ''}
                    mb={2}
                    InputProps={{ className: styles.input }}
                    type="text"
                    name="city"
                />
                <TextField
                    label="State"
                    fullWidth
                    onChange={handleChange}
                    value={userForm?.state ?? ''}
                    mb={2}
                    InputProps={{ className: styles.input }}
                    type="text"
                    name="state"
                />
                <TextField
                    label="Zip"
                    fullWidth
                    onChange={handleChange}
                    value={userForm?.zip ?? ''}
                    mb={2}
                    InputProps={{ className: styles.input }}
                    type="number"
                    name="zip"
                />
                <TextField
                    label="Country"
                    fullWidth
                    onChange={handleChange}
                    value={userForm?.country ?? ''}
                    mb={2}
                    InputProps={{ className: styles.input }}
                    type="text"
                    name="country"
                />
                <TextField
                    label="National ID"
                    fullWidth
                    onChange={handleChange}
                    value={userForm?.nationalId ?? ''}
                    mb={2}
                    InputProps={{ className: styles.input }}
                    type="text"
                    name="nationalId"
                />
                <TextField
                    label="Passport ID"
                    onChange={handleChange}
                    fullWidth
                    value={userForm?.passportId ?? ''}
                    mb={2}
                    InputProps={{ className: styles.input }}
                    type="number"
                    name="passportId"
                />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        mb: 2,
                    }}
                >
                    <Typography sx={{ minWidth: 100 }}>Gender</Typography>
                    <TextField
                        onChange={handleChange}
                        select
                        variant="outlined"
                        fullWidth
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </TextField>
                </Box>

                <TextField
                    label="Birthdate"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    mb={2}
                />
            </Container>
        </>
    );
};

export default UserDetails;
