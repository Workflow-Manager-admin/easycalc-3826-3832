import React from 'react';

// PUBLIC_INTERFACE
/**
 * Calculator Display Component
 * Displays the current input or result of calculations
 * @param {string} value - The value to be displayed
 */
const CalculatorDisplay = ({ value }) => {
  return (
    <div className="calculator-display">
      {value}
    </div>
  );
};

export default CalculatorDisplay;
