import React from 'react';
import {
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import styles from './DynamicListStyles';
import TicketItemView from '../TicketItem/TicketItemView';
import Container from '../CustomComponents/Container';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import PropTypes from 'prop-types';

const DynamicListView = (props) => {
    const { data, handleFilterChange } = props;
    return (
        <Container>
            <Box className={styles.pageContainer}>
                <Box className={styles.filterContainer}>
                    {/*filters have this fields:
                    - destination city
                    - departure city
                    - departure date
                    - return date
                    - number of passengers 
                    */}
                    <Typography variant="h6" mb={5}>
                        filters
                    </Typography>
                    <TextField
                        InputProps={{
                            className: styles.filterInputs,
                        }}
                        label="destination city"
                        type="text"
                        onChange={(e) => {
                            handleFilterChange(e);
                        }}
                        name="destinationCity"
                    />
                    <TextField
                        InputProps={{
                            className: styles.filterInputs,
                        }}
                        label="departure city"
                        type="text"
                        onChange={(e) => {
                            handleFilterChange(e);
                        }}
                        name="departureCity"
                    />

                    <TextField
                        InputProps={{
                            className: styles.filterInputs,
                        }}
                        label="number of passengers"
                        type="number"
                        onChange={(e) => {
                            handleFilterChange(e);
                        }}
                        name="numberOfPassengers"
                    />
                    {/* check box for sorting by cheapest */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                                name="checkedH"
                            />
                        }
                        label="sort by cheapest"
                    />
                </Box>
                <Box className={styles.container}>
                    <Box className={styles.header}>
                        <Typography variant="h6">tickets</Typography>
                    </Box>
                    <Box className={styles.mainContainer}>
                        {data.map((item, index) => (
                            <React.Fragment key={index}>
                                <TicketItemView item={item} />
                            </React.Fragment>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default DynamicListView;

DynamicListView.propTypes = {
    data: PropTypes.array.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
};
