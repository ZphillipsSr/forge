import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ThemeSelect: React.FC = () => {
  const navigate = useNavigate();

  const applyTheme = (theme: 'light' | 'dark') => {
    localStorage.setItem('forge.theme', theme);
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
    
    // Slight delay for visual feedback
    setTimeout(() => {
      navigate('/home', { replace: true });
    }, 150);
  };

  useEffect(() => {
      // If user somehow gets here but already has a theme, we could redirect, 
      // but maybe they want to change it. So we stay.
  }, []);

  return (
    <div className="theme-select-container">
      <h2>Choose Your Side</h2>
      <div className="theme-options">
        <div 
          className="theme-card light" 
          onClick={() => applyTheme('light')}
          role="button"
          tabIndex={0}
        >
          <h3>Light</h3>
        </div>
        <div 
          className="theme-card dark" 
          onClick={() => applyTheme('dark')}
          role="button"
          tabIndex={0}
        >
          <h3>Dark</h3>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelect;
