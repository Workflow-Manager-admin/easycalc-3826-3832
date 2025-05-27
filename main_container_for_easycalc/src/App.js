import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
/**
 * EasyCalc Calculator App
 * A simple calculator that allows users to perform basic arithmetic operations
 */
function App() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  /**
   * Handles digit button clicks
   */
  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  /**
   * Handles decimal point input
   */
  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  /**
   * Clears all calculator states
   */
  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  /**
   * Handles operation button clicks
   */
  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation(operator, firstOperand, inputValue);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  /**
   * Performs the calculation based on the operator
   */
  const performCalculation = (operator, firstOperand, secondOperand) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return secondOperand === 0 ? 'Error' : firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  /**
   * Calculates and displays the result
   */
  const calculateResult = () => {
    if (!operator || firstOperand === null) return;

    const inputValue = parseFloat(display);
    const result = performCalculation(operator, firstOperand, inputValue);
    
    setDisplay(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  /**
   * Toggles the sign of the current value
   */
  const toggleSign = () => {
    setDisplay(display.charAt(0) === '-' ? display.substring(1) : '-' + display);
  };

  /**
   * Converts the current value to a percentage
   */
  const percentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> EasyCalc
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="hero">
            <h1 className="calculator-title">EasyCalc</h1>
            
            <div className="calculator-container">
              <div className="calculator-display">{display}</div>
              <div className="calculator-buttons">
                <button className="calculator-button" onClick={clearDisplay}>AC</button>
                <button className="calculator-button" onClick={toggleSign}>+/-</button>
                <button className="calculator-button" onClick={percentage}>%</button>
                <button className="calculator-button operator" onClick={() => handleOperator('/')}>÷</button>
                
                <button className="calculator-button" onClick={() => inputDigit('7')}>7</button>
                <button className="calculator-button" onClick={() => inputDigit('8')}>8</button>
                <button className="calculator-button" onClick={() => inputDigit('9')}>9</button>
                <button className="calculator-button operator" onClick={() => handleOperator('*')}>×</button>
                
                <button className="calculator-button" onClick={() => inputDigit('4')}>4</button>
                <button className="calculator-button" onClick={() => inputDigit('5')}>5</button>
                <button className="calculator-button" onClick={() => inputDigit('6')}>6</button>
                <button className="calculator-button operator" onClick={() => handleOperator('-')}>-</button>
                
                <button className="calculator-button" onClick={() => inputDigit('1')}>1</button>
                <button className="calculator-button" onClick={() => inputDigit('2')}>2</button>
                <button className="calculator-button" onClick={() => inputDigit('3')}>3</button>
                <button className="calculator-button operator" onClick={() => handleOperator('+')}>+</button>
                
                <button className="calculator-button span-two" onClick={() => inputDigit('0')}>0</button>
                <button className="calculator-button" onClick={inputDecimal}>.</button>
                <button className="calculator-button operator" onClick={calculateResult}>=</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
