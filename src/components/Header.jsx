import React from "react"
import { Link } from 'react-router-dom';
import './Header.css'; 

function Header() {
  return(
    <div className="header-container">
      <header className="header">
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/projects" className="nav-link">Projects</Link>
          <Link to="/articles" className="nav-link">Articles</Link>
          <Link to="/about" className="nav-link">Me</Link>
        </nav>
      </header>
    </div>
  );
}

export default Header
