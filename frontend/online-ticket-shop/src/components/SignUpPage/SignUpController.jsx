import React, { useState } from 'react';
import { toast } from 'react-toastify';

import SignUpView from './SignUpView';

const SignUpController = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        're-enter-password': '',
        'phone-number': '',
    });

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
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
};

export default SignUpController;
