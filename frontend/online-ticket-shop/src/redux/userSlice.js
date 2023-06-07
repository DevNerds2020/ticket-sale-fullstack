import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            id: null,
            itemsBag: [],
            itemsHistory: [],
        },
    },
    reducers: {
        //after login
        addUser: (state, action) => {
            state.user = action.payload;
        },
        editUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = {
                id: null,
                itemsBag: [],
                itemsHistory: [],
            };
        },
        addTicket: (state, action) => {
            const item = state.user.itemsBag.find(
                (item) => item.id === action.payload.id
            );
            if (item) {
                item.quantity += 1;
            } else {
                state.user.itemsBag.push({
                    ...action.payload,
                    quantity: 1,
                });
            }
        },
        removeTicket: (state, action) => {
            const item = state.user.itemsBag.find(
                (item) => item.id === action.payload.id
            );
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.user.itemsBag = state.user.itemsBag.filter(
                        (item) => item.id !== action.payload.id
                    );
                }
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { logout, addTicket, removeTicket, addUser, editUser } =
    userSlice.actions;

export default userSlice.reducer;
