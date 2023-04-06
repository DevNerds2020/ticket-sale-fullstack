import { createSlice } from '@reduxjs/toolkit';

export const webSlice = createSlice({
    name: 'web',
    initialState: {
        language: 'en',
        theme: 'light',
    },
    reducers: {
        setLanguage: (state, action) => {
            console.log('action.payload', action.payload);
            state.language = action.payload;
        },
    },
});

export const { setLanguage } = webSlice.actions;

export default webSlice.reducer;
