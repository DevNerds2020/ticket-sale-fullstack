import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import SignUpView from './SignUpView';

const SignUpController = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        're-enter-password': '',
        'phone-number': '',
    });

    const { language, theme } =
        useSelector((state) => state.webReducer) || 'en';

    /**
     * @function handleChange
     * @param {*} event
     * @returns void
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    /**
     * @function handleSubmit
     * @param {*} event
     * @returns void
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.password !== formData['re-enter-password']) {
            toast.error('Passwords do not match');
            return;
        }
    };

    return (
        <SignUpView
            formData={formData}
            language={language}
            theme={theme}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
};

export default SignUpController;
