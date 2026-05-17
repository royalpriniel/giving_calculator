import React, { useState } from 'react';

const GivingCalculator = () => {
  const [currency, setCurrency] = useState('');
  const [incomeInput, setIncomeInput] = useState('');
  const [factor, setFactor] = useState('1');
  const [result, setResult] = useState('');
  const [feedback, setFeedback] = useState('');

  const calculateGivings = (e) => {
    e.preventDefault();

    // Regular Expression to extract only digits and decimal points
    // This handles the "alphanumeric" extraction requirement
    const sanitizedIncome = incomeInput.replace(/[^0-9.]/g, '');
    const amount = parseFloat(sanitizedIncome);
    const givingFactor = parseFloat(factor);

    if (isNaN(amount) || isNaN(givingFactor)) {
      setResult("Please enter valid numbers.");
      return;
    }

    // Calculation Logic
    const giving = amount * 0.1 * givingFactor;
    
    // Formatting to 2 decimal places and adding commas
    const fmtdGiving = giving.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    setResult(`Your desired giving amount is ${fmtdGiving} ${currency}.`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Giving Calculator</h2>
      
      <form onSubmit={calculateGivings}>
        <div style={{ marginBottom: '15px' }}>
          <label>Currency (e.g., USD, NGN, GBP): </label>
          <input 
            type="text" 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)} 
            placeholder="Enter currency"
            required 
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Income Amount: </label>
          <input 
            type="text" 
            value={incomeInput} 
            onChange={(e) => setIncomeInput(e.target.value)} 
            placeholder="e.g. 5000"
            required 
          />
          <small style={{ display: 'block', color: '#666' }}>Digits only preferred, but we'll clean it up!</small>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Giving Factor: </label>
          <input 
            type="number" 
            step="0.1"
            value={factor} 
            onChange={(e) => setFactor(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Calculate
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <strong>{result}</strong>
        </div>
      )}

      <hr style={{ margin: '20px 0' }} />

      <div>
        <label>How did we do (1-10)? </label>
        <input 
          type="number" 
          value={feedback} 
          onChange={(e) => setFeedback(e.target.value)} 
          style={{ width: '50px' }}
        />
        <button onClick={() => console.log("Feedback Score:", feedback)}>Submit</button>
      </div>
    </div>
  );
};

export default GivingCalculator;
