import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [result, setResult] = useState("");

  const handleClick = (e) => {
    const value = e.target.name;
    if (
      (value === '+' || value === '-' || value === '*' || value === '/') &&
      (result === '' || result.endsWith('+') || result.endsWith('-') || result.endsWith('*') || result.endsWith('/'))
    ) {
      return;
    }
    setResult(result.concat(value));
  };

  const clear = () => {
    setResult("");
  };

  const backspace = () => {
    setResult(result.slice(0, -1));
  };

  const calculate = () => {
    try {
      setResult(eval(result).toString());
    } catch (err) {
      setResult("Error");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      calculate();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const lastChar = value.slice(-1);
    if (/[0-9+\-*/.]/.test(lastChar) || value === "") {
      setResult(value);
    }
  };

  const renderButton = (name, className = '') => (
    <button name={name} onClick={handleClick} className={className}>
      {name}
    </button>
  );

  return (
    <>
      <div className='container'>
        <form>
          <input
            type="text"
            value={result}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </form>
        <div className='keypad'>
          <button className='highlight' onClick={clear} id="clear">Clear</button>
          <button className='highlight' onClick={backspace} id="backspace">C</button>
          {renderButton('/', 'highlight')}
          {renderButton('7')}
          {renderButton('8')}
          {renderButton('9')}
          {renderButton('*', 'highlight')}
          {renderButton('4')}
          {renderButton('5')}
          {renderButton('6')}
          {renderButton('-', 'highlight')}
          {renderButton('1')}
          {renderButton('2')}
          {renderButton('3')}
          {renderButton('+', 'highlight')}
          {renderButton('0')}
          {renderButton('.')}
          <button className='highlight' onClick={calculate} id="result">=</button>
        </div>
      </div>
    </>
  );
};

export default App;
