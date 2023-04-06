import { createSlice } from '@reduxjs/toolkit';

export const webSlice = createSlice({
    name: 'web',
    initialState: {
        language: 'en',
        theme: '#1976d2',
    },
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
    },
});

export const { setLanguage, setTheme } = webSlice.actions;

export default webSlice.reducer;
