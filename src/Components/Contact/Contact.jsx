import React from 'react';
import '../Contact/Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <div className='contact'>
      <h1>Contact</h1>
      <div className='contact-item'>
        <FontAwesomeIcon icon={faPhone} size="lg" />
        <h2>Call: <span className="contact-info">0783439588</span></h2>
      </div>
      <div className='contact-item'>
        <FontAwesomeIcon icon={faEnvelope} size="lg" />
        <h2>Email: <span className="contact-info">Trinnmse182325@fpt.edu.vn</span></h2>
      </div>
    </div>
  );
};

export default Contact;
