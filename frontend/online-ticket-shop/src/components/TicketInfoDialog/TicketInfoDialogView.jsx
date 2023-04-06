import { Button, Dialog } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const TicketInfoDialogView = (props) => {
    const { open, handleClose } = props;
    return (
        <Dialog open={open}>
            <Dialog.Title>title</Dialog.Title>
            <Dialog.Content>content</Dialog.Content>
            <Dialog.Actions>
                <Button onClick={handleClose}> close</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default TicketInfoDialogView;

TicketInfoDialogView.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};
