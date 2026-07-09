import React from "react"
import { Link } from 'react-router-dom';
import './Header.css';
import ThemeSwitcher from './ThemeSwitcher';

function Header() {
  return(
    <div className="header-container">
      <header className="header">
        <Link to="/" className="site-name">Sai Yashwanth</Link>
        <nav>
          <Link to="/projects" className="nav-link">Projects</Link>
          <Link to="/articles" className="nav-link">Essays</Link>
          <Link to="/about" className="nav-link">About</Link>
          <ThemeSwitcher />
        </nav>
      </header>
    </div>
  );
}

export default Header
