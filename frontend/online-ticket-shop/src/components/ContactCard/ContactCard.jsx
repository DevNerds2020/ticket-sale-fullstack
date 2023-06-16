import React from 'react';

const ContactCard = () => {
    return (
        <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden mx-auto">
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">Contact Me</h2>
                <p className="text-gray-600">
                    Feel free to reach out to me with any questions or
                    inquiries.
                </p>
            </div>
            <div className="bg-gray-100 p-4 flex justify-center">
                <a
                    href="mailto:amirrezaalasti@gmail.com"
                    className="text-blue-500 font-semibold"
                >
                    Email: amirrezaalasti@gmail.com
                </a>
            </div>
        </div>
    );
};

export default ContactCard;
