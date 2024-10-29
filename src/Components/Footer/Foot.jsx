import React, { useEffect } from 'react';
import PropTypes from 'prop-types';  
import './Foot.css';

const Footer = ({ theme }) => {
  const specialTextColor = theme === 'dark' ? 'white' : 'black';  

  useEffect(() => {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark-mode');  
    } else {
      body.classList.remove('dark-mode'); 
    }
  }, [theme]);

  return (
    <div className="con" style={{ color: specialTextColor }}>
      <div className="shadow-lg container-main">
        <footer className={`footer ${theme === 'dark' ? 'dark' : ''}`}>
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Orchid Gallery. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

Footer.propTypes = {
  theme: PropTypes.string.isRequired,  
};

export default Footer;