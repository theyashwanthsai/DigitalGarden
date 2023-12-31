import React from "react"

import { Link } from 'react-router-dom';

function Header() {
  return(
    <div >
      <header className="flex p-3">
        <nav>
          {/* <a  className="p-3" >Home</a>
          <a className="p-3" href="">Blog</a>
          <a  className="p-3" href="">Projects</a>
          <a   className="p-3" href="">About</a> */}
          <Link to = "/" className="p-3" >Home</Link>
          <Link to = "/projects" className="p-3" href="">Projects</Link>
          <Link to = "/articles" className="p-3" href="">Articles</Link>
          <Link to = "/about" className="p-3" href="">Me</Link>
        
        </nav>
      </header>
    </div>
  );

  
  
}

export default Header
  