import { List } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResponsiveAppBar from '../CustomComponents/ResponsiveAppBar';
import Container from '../CustomComponents/Container';
import TicketItemController from '../TicketItem/TicketItemController';
import { translations } from '../../utils/translations';
import { API_URL } from '../../../config';
import { setItemsBag } from '../../redux/userSlice';

const UserReservationsView = () => {
    const { user } = useSelector((state) => state.userReducer);
    const { language } = useSelector((state) => state.webReducer);
    const dispatch = useDispatch();

    const { itemsBag } = user;

    const getUserReservations = useCallback(async () => {
        try {
            const url = `${API_URL}/users/${user.id}/tickets`;
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data) {
                dispatch(setItemsBag(data));
            }
        } catch (error) {
            console.log('%c Line:29 🍇 error', 'color:#2eafb0', error);
        }
    }, [user]);

    useEffect(() => {
        getUserReservations();
    }, []);

    return (
        <div>
            <ResponsiveAppBar />
            <Container>
                <h1 className="text-2xl font-bold">
                    {translations[language].reservations}
                </h1>
                <List>
                    {itemsBag?.map((item) => (
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
