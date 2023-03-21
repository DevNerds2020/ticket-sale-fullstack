import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        tickets: [],
    },
    reducers: {
        login: () => {
            // ...
        },
        signUp: () => {
            // ..
        },
        addTicket: () => {
            // ..
        },
        removeTicket: () => {
            // ..
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, signUp, addTicket, removeTicket } = userSlice.actions;

export default userSlice.reducer;
