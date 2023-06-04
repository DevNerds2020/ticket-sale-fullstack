import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LoginView } from './LoginView';
import { API_URL } from '../../../config';
import { toast } from 'react-toastify';

const LoginController = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    //if language is undefined, set it to english
    const { language, theme } =
        useSelector((state) => state.webReducer) || 'en';

    /**
     * @function handleChange
     * @param {*} event
     * @returns void
     * @description
     * This function is used to update the state of the form data
     * when the user types in the input fields.
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    /**
     * @function requestLogin
     * @returns void
     */
    const requestLogin = async () => {
        const url = `${API_URL}/login`;
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.error) {
            toast.error(data.error);
            return;
        }
        toast.success('Logged in successfully');
    };

    /**
     * @function handleSubmit
     * @param {*} event
     * @returns void
     * @description
     * This function is used to handle the form submission.
     * It will check if the passwords match and if they do
     * it will send the data to the backend.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        requestLogin();
    };

    return (
        <LoginView
            formData={formData}
            language={language}
            theme={theme}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
};

export default LoginController;
