import React from 'react';
import TicketItemsListView from '../TicketItemsList/TicketItemsListView';
import ResponsiveAppBar from '../CustomComponents/ResponsiveAppBar';
import { translations } from '../../utils/translations';
import PropTypes from 'prop-types';

export const HomeView = (props) => {
    const { language } = props;
    return (
        <div>
            <ResponsiveAppBar />
            <TicketItemsListView
                title={translations[language].airplaneTickets}
            />
            <TicketItemsListView title={translations[language].trainTickets} />
            <TicketItemsListView
                title={translations[language].hotelReservation}
            />
        </div>
    );
};

HomeView.propTypes = {
    language: PropTypes.string.isRequired,
};
