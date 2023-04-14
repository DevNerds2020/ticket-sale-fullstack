import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';

import styles from './TicketInfoDialogStyles';
import { translations } from '../../utils/translations';
import { addTicket } from '../../redux/userSlice';

//TODO: items should have comments and the detail text should change
const TicketInfoDialogView = (props) => {
    const { item, open, handleClose } = props;
    const { language, theme } = useSelector((state) => state.webReducer);
    const dispatch = useDispatch();

    const handleAddToUserBag = () => {
        dispatch(addTicket(item));
    };

    return (
        <Dialog fullScreen open={open}>
            <DialogTitle className={styles.dialogHeader}>
                {translations[language].ticketInfo}
            </DialogTitle>
            <DialogContent className={styles.dialogContent}>
                {Object.keys(item).map((key) => (
                    <p key={key}>
                        {key}: {item[key]}
                    </p>
                ))}
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{
                        color: `${theme}`,
                    }}
                    onClick={handleClose}
                    size="large"
                >
                    {translations[language].close}
                </Button>
                <IconButton
                    size="large"
                    sx={{ color: `${theme}` }}
                    onClick={handleAddToUserBag}
                >
                    <AddIcon />
                </IconButton>
            </DialogActions>
        </Dialog>
    );
};

export default TicketInfoDialogView;

TicketInfoDialogView.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
};
