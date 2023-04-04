import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import Container from '../CustomComponents/Container';
import styles from '../../globalStyles';

const UserDetails = () => {
    return (
        <Container sx={{ maxWidth: 600 }}>
            <Typography variant="h5" mb={2}>
                User Details
            </Typography>

            <TextField
                label="Name"
                fullWidth
                mb={2}
                InputProps={{ className: styles.input }}
                type="text"
            />
            <TextField
                label="Email"
                fullWidth
                mb={2}
                InputProps={{ className: styles.input }}
                type="email"
            />
            <TextField
                label="Phone"
                fullWidth
                mb={2}
                InputProps={{ className: styles.input }}
                type="tel"
            />
            <TextField
                label="Address"
                fullWidth
                mb={2}
                InputProps={{ className: styles.input }}
                type="text"
            />
            <TextField
                label="City"
                fullWidth
                mb={2}
                InputProps={{ className: styles.input }}
                type="text"
            />
            <TextField
                label="State"
                fullWidth
                mb={2}
                InputProps={{ className: styles.input }}
                type="text"
            />
            <TextField
                label="Zip"
                fullWidth
                mb={2}
                InputProps={{ className: styles.input }}
                type="number"
            />
            <TextField
                label="Country"
                fullWidth
                mb={2}
                InputProps={{ className: styles.input }}
                type="text"
            />
            <TextField
                label="National ID"
                fullWidth
                mb={2}
                InputProps={{ className: styles.input }}
                type="text"
            />
            <TextField
                label="Passport ID"
                fullWidth
                mb={2}
                InputProps={{ className: styles.input }}
                type="number"
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
                <TextField select variant="outlined" fullWidth>
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
    );
};

export default UserDetails;
