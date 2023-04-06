import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import webReducer from './webSlice';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (error) {
        console.log(error);
    }
};

const store = configureStore({
    reducer: { userReducer, webReducer },
    preloadedState: loadState(),
});

store.subscribe(() => {
    saveState(store.getState());
});

export default store;
