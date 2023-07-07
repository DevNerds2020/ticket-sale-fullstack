import React from 'react';
import TicketItemsListView from '../TicketItemsList/TicketItemsListView';
import ResponsiveAppBar from '../CustomComponents/ResponsiveAppBar';
import { translations } from '../../utils/translations';
import PropTypes from 'prop-types';
import Footer from '../Footer/Footer';

export const HomeView = (props) => {
    const { language, tickets } = props;
    return (
        <div>
            <ResponsiveAppBar />
            <TicketItemsListView
                data={tickets.airplane_tickets}
                title={translations[language].airplaneTickets}
                itemsType="airplane"
            />
            <TicketItemsListView
                data={tickets.train_tickets}
                title={translations[language].trainTickets}
                itemsType="train"
            />
            <TicketItemsListView
                data={tickets.hotel_tickets}
                title={translations[language].hotelReservation}
                itemsType="hotel"
            />
            <Footer />
        </div>
    );
};

HomeView.propTypes = {
    language: PropTypes.string.isRequired,
    tickets: PropTypes.array.isRequired,
};
