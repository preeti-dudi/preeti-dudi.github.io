import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaCode,
  FaProjectDiagram,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Define the navigation links with their corresponding icons and paths.
  const navLinks = [
    { to: '/', icon: <FaHome />, text: 'Home' },
    { to: '/work', icon: <FaBriefcase />, text: 'Work' },
    { to: '/services', icon: <FaBriefcase />, text: 'Services' },
    { to: '/skills', icon: <FaCode />, text: 'Skills' },
    { to: '/projects', icon: <FaProjectDiagram />, text: 'Projects' },
    { to: '/about', icon: <FaUser />, text: 'About' },
  ];

  return (
    <nav className="header">
      {/* Menu Toggle Button */}
      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
      
      {/* Navigation Links */}
      <ul className={`nav-links ${isMenuOpen ? 'open' : 'closed'}`}>
        {navLinks.map((link, index) => (
          <li key={index} className="nav-item">
            <Link to={link.to} className="nav-link" onClick={closeMenu}>
              <span className="icon">{link.icon}</span>
              <span className="link-text">{link.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Header;
