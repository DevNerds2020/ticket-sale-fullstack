import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import SignUpView from './SignUpView';
import { API_URL } from '../../../config';

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
     * @function requestSignUp
     * @returns void
     */
    const requestSignUp = async () => {
        const url = `${API_URL}/register`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                phone: formData['phone-number'],
            }),
        });
        const data = await response.json();
        if (data.error) {
            toast.error(data.error);
            return;
        }
        toast.success('Account created successfully');
    };

    /**
     * @function handleSubmit
     * @param {*} event
     * @returns void
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.password !== formData['re-enter-password']) {
            toast.error('Passwords do not match');
            return;
        }
        requestSignUp();
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
