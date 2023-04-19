import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import router from './customRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { addUser } from './redux/userSlice';

function App() {
    //add test user to redux store
    const { user } = useSelector((state) => state.userReducer);

    const dispatch = useDispatch();
    useEffect(() => {
        if (user?.id) return;
        console.log('test user added to redux store');
        dispatch(
            addUser({
                id: 1,
                name: 'test',
                email: 'test@gmail.com',
                itemsBag: [],
            })
        );
    }, []);
    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
