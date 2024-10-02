import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const DarkModeToggle = ({ toggleDarkMode, darkMode }) => {
    return (
        <div className='fixed m-4 top-[calc(1rem+10px)] right-[calc(1rem+0px)]'>
            <div 
                onClick={toggleDarkMode} 
                className='flex items-center m-4 justify-center w-12 h-12 bg-gray-200 rounded-full dark:bg-gray-700 cursor-pointer transform transition duration-300'
            >
                <FontAwesomeIcon 
                    icon={darkMode ? faSun : faMoon} 
                    className='text-gray-800 dark:text-gray-200'
                />
            </div>
        </div>
    );
};

export default DarkModeToggle;
