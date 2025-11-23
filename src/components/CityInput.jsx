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
    // Change the form class for the new styling
    <form onSubmit={handleSubmit} className="ai-form-container">
        
      {/* WRAPPER: Helps control the input and button layout */}
      <div className="input-group"> 
        
        {/* We can hide the label in this modern design for a cleaner look, 
            but keep it for accessibility (screen readers) */}
        <label htmlFor="city-input" className="visually-hidden">
          What city are you in?
        </label>
        
        <input
          type="text"
          id="city-input"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter city, e.g., Tokyo" // Shortened placeholder for style
          required
          autoComplete="address-level2"
          className="city-input-field" // New class for styling
        />
        
        {/* New class for the button */}
        <button type="submit" className="submit-button">
          Get a suggestion
        </button> 
        
      </div>
    </form>
  );
}

export default CityInput;