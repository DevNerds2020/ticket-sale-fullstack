import React from 'react';
import ResponsiveAppBar from '../CustomComponents/ResponsiveAppBar';
import TicketItemsListView from '../TicketItemsList/TicketItemsListView';

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
