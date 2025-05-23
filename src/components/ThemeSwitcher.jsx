import React, { useEffect, useState } from 'react';
import '../components/color.css';

const ThemeSwitcher = () => {
    const [currentTheme, setCurrentTheme] = useState('emerald');
    const [themes, setThemes] = useState([]);

    useEffect(() => {
        // Extract themes from color.css
        const extractThemes = () => {
            const styleSheets = Array.from(document.styleSheets);
            const themes = [];
            
            styleSheets.forEach(sheet => {
                try {
                    const rules = Array.from(sheet.cssRules);
                    rules.forEach(rule => {
                        if (rule.selectorText && rule.selectorText.startsWith('.theme-') && !rule.selectorText.startsWith('.theme-switch')) {
                            const themeId = rule.selectorText.replace('.theme-', '');
                            console.log(themeId);
                            // Convert theme ID to display name
                            const themeName = themeId
                                .split('-')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ');
                            themes.push({ id: themeId, name: themeName });
                        }
                    });
                } catch (e) {
                    // Skip cross-origin stylesheets
                    console.log('Skipping cross-origin stylesheet');
                }
            });
            
            return themes;
        };

        const availableThemes = extractThemes();
        setThemes(availableThemes);

        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem('theme') || 'emerald';
        setCurrentTheme(savedTheme);
        document.body.className = `theme-${savedTheme}`;
    }, []);

    const handleThemeChange = (event) => {
        const newTheme = event.target.value;
        setCurrentTheme(newTheme);
        document.body.className = `theme-${newTheme}`;
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className="theme-switcher-container">
            <label htmlFor="theme-select"></label>
            <div className="theme-switcher">
                <select 
                    id="theme-select"
                    value={currentTheme} 
                    onChange={handleThemeChange}
                >
                    {themes.map(theme => (
                        <option key={theme.id} value={theme.id}>
                            {theme.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ThemeSwitcher; 