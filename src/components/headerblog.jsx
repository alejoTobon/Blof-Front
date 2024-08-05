import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import reactLogo from '../assets/react.svg';

import './header.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <h1 className="h1 titulo m-0">BlogReact</h1>
          </div>
        </div>

        <form className="d-flex align-items-center">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar"
            aria-label="Buscar"
            style={{ minWidth: '200px' }} // Adjusted minimum width for responsiveness
          />
          <button className="btn btn-primary" type="submit" style={{ minWidth: '100px' }}>Buscar</button>
        </form>

        <div className="user d-flex align-items-center">
          <img
            src="/src/assets/chris-hemsworth.webp"
            alt="Profile"
            style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} // Reduced profile image size
          />
          <span style={{ color: 'white', display: 'none' }}>Alejandro Tobón</span> {/* Hiding name for responsiveness */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
