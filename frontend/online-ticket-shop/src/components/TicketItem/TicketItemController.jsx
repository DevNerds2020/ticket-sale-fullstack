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
import { API_URL } from '../../../config';

const TicketItemController = (props) => {
    const { item, boughtItem, itemsType } = props;
    const { language, theme } = useSelector((state) => state.webReducer);
    const { user } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const [infoDialogOpen, setInfoDialogOpen] = useState(false);

    const handleInfoDialogClose = () => {
        setInfoDialogOpen(false);
    };

    const requestRemoveTicket = async () => {
        const url = `${API_URL}/tickets/${item.id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include', // Send cookies in cross-origin requests
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.status === 'success') {
            toast.success(translations[language].ticketRemovedSuccessfully);
            dispatch(removeTicket(item));
        } else {
            toast.error(translations[language].cantRemoveTicket);
        }
    };

    const requestBuyTicket = async () => {
        const url = `${API_URL}/users/tickets`;
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include', // Send cookies in cross-origin requests
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user.id,
                ticket_id: item.id,
                ticket_type: itemsType,
            }),
        });
        const data = await response.json();
        if (data.status === 'success') {
            toast.success(translations[language].ticketBoughtSuccessfully);
            dispatch(addTicket(item));
        } else {
            toast.error(translations[language].cantBuyTicket);
        }
    };

    const handleBuy = () => {
        console.log('item', item);
        if (checkUserPermissionToBuyTicket(user)) {
            requestBuyTicket();
        } else {
            toast.error(translations[language].completeYourProfileFirst);
        }
    };
    const handleRemove = () => {
        if (checkPermissionToRemoveTicketFromShoppingBag(item)) {
            requestRemoveTicket();
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
    itemsType: PropTypes.string,
};
