import React, { useState } from 'react';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButton from './CalculatorButton';

// PUBLIC_INTERFACE
/**
 * Calculator Component
 * A simple calculator that allows basic arithmetic operations
 */
const Calculator = () => {
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
    <div className="calculator-container">
      <CalculatorDisplay value={display} />
      <div className="calculator-buttons">
        <CalculatorButton onClick={clearDisplay}>AC</CalculatorButton>
        <CalculatorButton onClick={toggleSign}>+/-</CalculatorButton>
        <CalculatorButton onClick={percentage}>%</CalculatorButton>
        <CalculatorButton className="operator" onClick={() => handleOperator('/')}>÷</CalculatorButton>
        
        <CalculatorButton onClick={() => inputDigit('7')}>7</CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('8')}>8</CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('9')}>9</CalculatorButton>
        <CalculatorButton className="operator" onClick={() => handleOperator('*')}>×</CalculatorButton>
        
        <CalculatorButton onClick={() => inputDigit('4')}>4</CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('5')}>5</CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('6')}>6</CalculatorButton>
        <CalculatorButton className="operator" onClick={() => handleOperator('-')}>-</CalculatorButton>
        
        <CalculatorButton onClick={() => inputDigit('1')}>1</CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('2')}>2</CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('3')}>3</CalculatorButton>
        <CalculatorButton className="operator" onClick={() => handleOperator('+')}>+</CalculatorButton>
        
        <CalculatorButton className="span-two" onClick={() => inputDigit('0')}>0</CalculatorButton>
        <CalculatorButton onClick={inputDecimal}>.</CalculatorButton>
        <CalculatorButton className="operator" onClick={calculateResult}>=</CalculatorButton>
      </div>
    </div>
  );
};

export default Calculator;
