import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-logo">
          {/* <div className="logo-circle-small">L</div> */}
          {/* <span className="logo-text">LexCorp</span> */}
        </div>
        <nav className="header-nav">
          <a href="#" className="nav-tab">Dashboard</a>
          <a href="#" className="nav-tab">Leave</a>
          <a href="#" className="nav-tab active">Attendance</a>
          <a href="#" className="nav-tab">Performance</a>
        </nav>
      </div>
      <div className="header-right">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search anything..."
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="header-shortcut">⌘F</div>
        <div className="header-icon">✉️</div>
        <div className="header-icon">🔔</div>
        <div className="user-avatar">
          <div className="avatar-circle"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
