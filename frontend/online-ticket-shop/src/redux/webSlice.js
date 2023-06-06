import { createSlice } from '@reduxjs/toolkit';

export const webSlice = createSlice({
    name: 'web',
    initialState: {
        language: 'en',
        theme: '#1976d2',
        tickets: {
            trainTickets: [],
            airplaneTickets: [],
            hotelTickets: [],
        },
    },
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        addTickets: (state, action) => {
            state.tickets = action.payload;
        },
    },
});

export const { setLanguage, setTheme, addTickets } = webSlice.actions;

export default webSlice.reducer;
