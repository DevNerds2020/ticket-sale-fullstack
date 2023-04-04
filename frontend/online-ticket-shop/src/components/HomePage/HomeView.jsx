import React from 'react';
import TicketItemsListView from '../TicketItemsList/TicketItemsListView';
import ResponsiveAppBar from '../CustomComponents/ResponsiveAppBar';

export const HomeView = () => {
    return (
        <div>
            <ResponsiveAppBar />
            <TicketItemsListView title={'air plane tickets'} />
            <TicketItemsListView title={'train tickets'} />
            <TicketItemsListView title={'hotel reservations'} />
        </div>
    );
};
