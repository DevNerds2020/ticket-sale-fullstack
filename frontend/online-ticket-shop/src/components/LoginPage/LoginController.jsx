import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LoginView } from './LoginView';

const LoginController = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    //if language is undefined, set it to english
    const { language } = useSelector((state) => state.webReducer) || 'en';

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
        console.log(formData);
    };

    return (
        <LoginView
            formData={formData}
            language={language}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
};

export default LoginController;
