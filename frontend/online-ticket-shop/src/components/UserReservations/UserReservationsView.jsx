import { List } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import ResponsiveAppBar from '../CustomComponents/ResponsiveAppBar';
import Container from '../CustomComponents/Container';
import TicketItemController from '../TicketItem/TicketItemController';
import { translations } from '../../utils/translations';

const UserReservationsView = () => {
    const { user } = useSelector((state) => state.userReducer);
    const { language } = useSelector((state) => state.webReducer);

    console.log('%c Line:7 🍐 user', 'color:#2eafb0', user);
    const { itemsBag } = user;

    return (
        <div>
            <ResponsiveAppBar />
            <Container>
                <h1 className="text-2xl font-bold">
                    {translations[language].reservations}
                </h1>
                <List>
                    {itemsBag.map((item) => (
                        <React.Fragment key={item.id}>
                            <TicketItemController
                                boughtItem={true}
                                item={item}
                            />
                        </React.Fragment>
                    ))}
                </List>
            </Container>
        </div>
    );
};

export default UserReservationsView;
