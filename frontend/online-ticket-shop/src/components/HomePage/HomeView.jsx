import React from 'react';
import ResponsiveAppBar from '../CustomComponents/ResponsiveAppBar';
import TicketItemsListView from '../TicketItemsList/TicketItemsListView';

export const HomeView = () => {
    return (
        <div>
            <ResponsiveAppBar />
            <TicketItemsListView />
            <TicketItemsListView />
            <TicketItemsListView />
        </div>
    );
};
