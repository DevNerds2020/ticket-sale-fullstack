import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import TicketItemView from './TicketItemView';
import TicketInfoDialogView from '../TicketInfoDialog/TicketInfoDialogView';

const TicketItemController = (props) => {
    const { item } = props;
    const { language, theme } = useSelector((state) => state.webReducer);
    const [infoDialogOpen, setInfoDialogOpen] = useState(false);

    const handleInfoDialogClose = () => {
        setInfoDialogOpen(false);
    };

    return (
        <>
            <TicketItemView
                item={item}
                language={language}
                theme={theme}
                setInfoDialogOpen={setInfoDialogOpen}
            />
            <TicketInfoDialogView
                item={item}
                open={infoDialogOpen}
                handleClose={handleInfoDialogClose}
            />
        </>
    );
};

export default TicketItemController;

TicketItemController.propTypes = {
    item: PropTypes.object.isRequired,
};
