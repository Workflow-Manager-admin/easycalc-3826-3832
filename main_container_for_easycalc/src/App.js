import React from 'react';
import './App.css';
import Calculator from './components/Calculator';

// PUBLIC_INTERFACE
/**
 * EasyCalc Calculator App
 * A simple calculator that allows users to perform basic arithmetic operations
 */
function App() {
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
            <Calculator />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
