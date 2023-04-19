import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import styles from './TicketInfoDialogStyles';
import { translations } from '../../utils/translations';

const TicketInfoDialogView = (props) => {
    const { item, open, handleClose, handleBuy, boughtItem, handleRemove } =
        props;
    const { language, theme } = useSelector((state) => state.webReducer);

    return (
        <Dialog open={open}>
            <DialogTitle className={styles.dialogHeader}>
                {translations[language].ticketInfo}
            </DialogTitle>
            <DialogContent className={styles.dialogContent}>
                <img src={item?.image} alt="ticket" />
                {Object.keys(item).map((key) =>
                    //if item[key] is image, render image
                    key === 'image' ? (
                        <></>
                    ) : (
                        <div
                            key={key}
                            className={styles.dialogItem}
                            style={{ background: `${theme}` }}
                            dir={language === 'en' ? 'ltr' : 'rtl'}
                        >
                            <p className={styles.dialogItemKey}>
                                {translations[language][key] || key}
                            </p>
                            <p className={styles.dialogItemValue}>
                                {item[key]}
                            </p>
                        </div>
                    )
                )}
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
                    onClick={boughtItem ? handleRemove : handleBuy}
                >
                    {boughtItem ? <RemoveIcon /> : <AddIcon />}
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
    handleBuy: PropTypes.func.isRequired,
    boughtItem: PropTypes.bool,
    handleRemove: PropTypes.func.isRequired,
};
