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
    <div style={{ padding: '1rem', fontFamily: 'sans-serif', maxWidth: '20rem', border: '0.05rem solid #ccc', borderRadius: '0.25rem', display: "flex", justifyContent: "center", alignItems: "center", flexDirection:"column" }}>
      <h2 style={{textAlign: "center"}}>Giving Calculator</h2>
      
      <form onSubmit={calculateGivings}>
        <div style={{ marginBottom: '0.75rem' }}>
          <label>Currency (e.g., USD, NGN, GBP): </label>
          <input
	    type="text"
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)} 
            placeholder="Enter currency"
            required 
          />
        </div>

        <div style={{ marginBottom: '0.75rem' }}>
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

        <div style={{ marginBottom: '0.75rem' }}>
          <label>Giving Factor: </label>
          <input 
	    className= "num"
	    type="number" 
            step="0.1"
            value={factor} 
            onChange={(e) => setFactor(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
          Calculate
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '1rem', padding: '0.5rem', backgroundColor: '#f0f0f0' }}>
          <strong>{result}</strong>
        </div>
      )}

      <hr style={{ backgroundColor: '#050', height: '0.3rem', width: '100%', margin: '3rem 0' }} />

      <div >
        <label>How did we do (1-10)? </label>
        <input 
	  className= "num"
          type="number" 
          value={feedback} 
          onChange={(e) => setFeedback(e.target.value)} 
        />
        <button onClick={() => console.log("Feedback Score:", feedback)}>Submit</button>
      </div>
    </div>
  );
};

export default GivingCalculator;
