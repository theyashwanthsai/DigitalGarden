import React from "react"
import { Link } from 'react-router-dom';
import './Header.css'; 
import ThemeSwitcher from './ThemeSwitcher';

function Header() {
  return(
    <div className="">
        {/* <div className="theme-switcher-container">
          <ThemeSwitcher />
        </div> */}
      <header className="header">
        <nav>

          <Link to="/" className="nav-link">Home</Link>
          <Link to="/projects" className="nav-link">Projects</Link>
          <Link to="/articles" className="nav-link">Essays</Link>
          <Link to="/about" className="nav-link">Me</Link>
        </nav>

        {/* Show theme switcher on all devices */}
        
      </header>
    </div>
  );
}

export default Header
