import React from 'react';
import {
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './DynamicListStyles';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import PropTypes from 'prop-types';

import Container from '../CustomComponents/Container';
import TicketItemController from '../TicketItem/TicketItemController';
import { translations } from '../../utils/translations';

const DynamicListView = (props) => {
    const {
        data,
        handleFilterChange,
        language,
        clearFilters,
        handleSortByCheapest,
        pageMeta,
    } = props;
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
                        {translations[language].filters}
                    </Typography>
                    <TextField
                        InputProps={{
                            className: styles.filterInputs,
                        }}
                        label={translations[language].destinationCity}
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
                        label={translations[language].departureCity}
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
                        label={translations[language].numberOfPassengers}
                        type="number"
                        onChange={(e) => {
                            handleFilterChange(e);
                        }}
                        name="numberOfPassengers"
                    />
                    <TextField
                        InputProps={{
                            className: styles.filterInputs,
                        }}
                        label={translations[language].departureDate}
                        type="date"
                        onChange={(e) => {
                            handleFilterChange(e);
                        }}
                        name="departureDate"
                        focused
                    />
                    <TextField
                        InputProps={{
                            className: styles.filterInputs,
                        }}
                        label={translations[language].returnDate}
                        type="date"
                        onChange={(e) => {
                            handleFilterChange(e);
                        }}
                        name="returnDate"
                        focused
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                                name="checkedH"
                            />
                        }
                        label={translations[language].sortByCheapest}
                        onClick={handleSortByCheapest}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                icon={<CloseIcon />}
                                checkedIcon={<CloseIcon />}
                                name="checkedH"
                            />
                        }
                        label={translations[language].clearFilters}
                        onClick={clearFilters}
                    />
                </Box>
                <Box className={styles.container}>
                    <Box className={styles.header}>
                        <Typography variant="h6">
                            {translations[language][pageMeta.pagename]}
                        </Typography>
                    </Box>
                    <Box className={styles.mainContainer}>
                        {data?.map((item, index) => (
                            <React.Fragment key={index}>
                                <TicketItemController item={item} />
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
    language: PropTypes.string.isRequired,
    clearFilters: PropTypes.func.isRequired,
    handleSortByCheapest: PropTypes.func.isRequired,
    pageMeta: PropTypes.object.isRequired,
};
