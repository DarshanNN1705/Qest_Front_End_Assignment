// src/components/Button.js
import React from 'react';
import '../styles/Button.css';

function Button({ onClick, children, className }) {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
