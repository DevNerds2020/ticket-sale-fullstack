import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import TicketItemView from './TicketItemView';
import TicketInfoDialogView from '../TicketInfoDialog/TicketInfoDialogView';
import { addTicket, removeTicket } from '../../redux/userSlice';
import {
    checkPermissionToRemoveTicketFromShoppingBag,
    checkUserPermissionToBuyTicket,
} from '../../helpers/userHelpers';
import { translations } from '../../utils/translations';

const TicketItemController = (props) => {
    const { item, boughtItem } = props;
    const { language, theme } = useSelector((state) => state.webReducer);
    const { user } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const [infoDialogOpen, setInfoDialogOpen] = useState(false);

    const handleInfoDialogClose = () => {
        setInfoDialogOpen(false);
    };

    const handleBuy = () => {
        if (checkUserPermissionToBuyTicket(user)) {
            dispatch(addTicket(item));
        } else {
            toast.error(translations[language].completeYourProfileFirst);
        }
    };
    const handleRemove = () => {
        if (checkPermissionToRemoveTicketFromShoppingBag(item)) {
            dispatch(removeTicket(item));
        } else {
            toast.error(translations[language].cantRemoveTicket);
        }
    };

    return (
        <>
            <TicketItemView
                item={item}
                language={language}
                theme={theme}
                handleBuy={handleBuy}
                setInfoDialogOpen={setInfoDialogOpen}
                boughtItem={boughtItem}
                handleRemove={handleRemove}
            />
            <TicketInfoDialogView
                item={item}
                open={infoDialogOpen}
                handleBuy={handleBuy}
                handleClose={handleInfoDialogClose}
                boughtItem={boughtItem}
                handleRemove={handleRemove}
            />
        </>
    );
};

export default TicketItemController;

TicketItemController.propTypes = {
    item: PropTypes.object.isRequired,
    boughtItem: PropTypes.bool,
};
