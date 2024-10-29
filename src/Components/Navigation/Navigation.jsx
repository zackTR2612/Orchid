import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Navigation.css';
import { UserAuth } from '../../Context/AuthContext';

const Navigations = ({ theme, setTheme }) => {
  const { user, logout } = UserAuth();
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [textColor, setTextColor] = useState('black');

  const handleToggleMode = () => {
    if (theme === 'light') {
      setTheme('dark');
      setBackgroundColor('black');
      setTextColor('white');
    } else {
      setTheme('light');
      setBackgroundColor('white');
      setTextColor('black');
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor }} className="custom-navbar">
        <div className="navbar-left">
          <Navbar.Brand as={Link} to="/" className="orchid-logo" style={{ color: textColor }}>
            Orchid Gallery
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-between">
          <Nav className="left-nav">
            <Nav.Link as={Link} to="/" style={{ color: textColor }}>Home</Nav.Link>
            {user?.email === 'minhtri.tphcm.2612@gmail.com' && (
              <Nav.Link as={Link} to="/orchids" style={{ color: textColor }}>Orchids</Nav.Link>
            )}
            <Nav.Link as={Link} to="/contact" style={{ color: textColor }}>Contact</Nav.Link>
            <Nav.Link as={Link} to="/special" style={{ color: textColor }}>Special</Nav.Link> 
            <Button
              variant="outline-light"
              onClick={handleToggleMode}
              style={{ color: textColor, borderColor: textColor, marginLeft: '10px' }}
            >
              Toggle Theme Mode
            </Button>
          </Nav>
          <div className="ms-auto">
            {user ? (
              <>
                <span style={{ color: textColor, margin: '0 5px' }}>{user.displayName || user.email}</span>
                <Button variant="link" onClick={handleSignOut} style={{ color: textColor }}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-link" style={{ color: textColor, textDecoration: 'none' }}>Login</Link>
                <span style={{ color: textColor, margin: '0 5px' }}>/</span>
                <Link to="/register" className="btn btn-link" style={{ color: textColor, textDecoration: 'none' }}>Register</Link>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

Navigations.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
};

export default Navigations;