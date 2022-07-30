import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
    <div className="navbars">
    <nav>
      <ul className="ul">
        <li>
          <Link to="/"><img src="https://picsum.photos/30/30" alt="logo unloaded" /></Link>
        </li>
        <li>
          <Link to="/bloglist">BLOGLIST</Link>
        </li>
        <li>
          <Link to="/blogview">BLOGVIEW</Link>
        </li>
      </ul>
    </nav>
  </div>
    </div>
  )
}

export default Navbar;