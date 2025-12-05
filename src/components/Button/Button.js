import React from 'react';
import './Button.css';
import ramoE from '../../imgs/ramo-e-1.svg';
import ramoD from '../../imgs/ramo-d-1.svg';


const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  ...props 
}) => {
  return (
    <div className="button-container">
      <img src={ramoE} alt="Ramo E" />

    <button
      className={`button button--${variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
    <img src={ramoD} alt="Ramo D" />
    </div>
  );
};

export default Button;

