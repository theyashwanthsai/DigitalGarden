import React from "react"
import { Link } from 'react-router-dom';
import './Header.css'; 
import ThemeSwitcher from './ThemeSwitcher';

function Header() {
  return(
    <div className="header-container">
      <header className="header">
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/projects" className="nav-link">Projects</Link>
          <Link to="/articles" className="nav-link">Essays</Link>
          <Link to="/about" className="nav-link">Me</Link>
        </nav>
        <div className="theme-switcher-container">
          <ThemeSwitcher />
        </div>
      </header>
    </div>
  );
}

export default Header
