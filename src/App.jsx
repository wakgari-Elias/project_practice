import React, { useState } from 'react';
import DarkModeToggle from './components/DarkModeToggle';
import Weather from './components/Weather';

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`app ${darkMode ? 'bg-gray-900' : 'bg-white'} transition duration-300`}>
            <DarkModeToggle toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            <Weather/>
        </div>
    );
};

export default App;
