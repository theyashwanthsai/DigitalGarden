import React, { useState } from 'react';

const ThemeSwitcher = () => {
    const [dark, setDark] = useState(() =>
        document.documentElement.classList.contains('dark')
    );

    const toggleTheme = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
            {dark ? '☀' : '☾'}
        </button>
    );
};

export default ThemeSwitcher;
