import React, { useState } from 'react';


/**
    * CityInput Component
 @param {function} onSubmit - Callback function to run when the form is submitted, 
 * receiving the entered city name as an argument.
 */
function CityInput({ onSubmit }) {
  
  const [city, setCity] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the page from reloading on form submission
    
    const trimmedCity = city.trim();

    if (trimmedCity) {
      // Call the passed-in onSubmit function with the city name
      onSubmit(trimmedCity); 
      setCity(''); // to clear the input field after submission
    } else {
      alert('Please enter a city name.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="city-input-form">
      <label htmlFor="city-input">
        What city are you in?
      </label>
      <input
        type="text"
        id="city-input"
        name="city"
        value={city}
        onChange={(e) => setCity(e.target.value)} 
        placeholder="e.g., London, Tokyo, New York"
        required
        // browser autocomplete
        autocomplete="address-level2" 
      />
      <button type="submit">
        Get Weather & Suggestions
      </button>
    </form>
  );
}

export default CityInput;