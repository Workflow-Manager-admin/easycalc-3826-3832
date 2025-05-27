import React from 'react';

// PUBLIC_INTERFACE
/**
 * Calculator Button Component
 * A reusable button component for the calculator
 * @param {string} className - Additional class names for styling
 * @param {function} onClick - Function to handle the button click
 * @param {node} children - Button label content
 */
const CalculatorButton = ({ className = '', onClick, children }) => {
  const buttonClassName = `calculator-button ${className}`.trim();
  
  return (
    <button 
      className={buttonClassName}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CalculatorButton;
