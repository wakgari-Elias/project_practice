// src/components/ErrorMessage.jsx

import React from 'react';

const ErrorMessage = ({ message }) => {
    return (
        <p className='text-gray-50 text-xl  capitalize rounded-md p-4 mt-4'>
            {message}
        </p>
    );
};

export default ErrorMessage;
