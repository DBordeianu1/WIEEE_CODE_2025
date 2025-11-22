import React, { useState } from 'react';
import CityInput from '../components/CityInput'; 

function Chat() {
  // State to hold the city chosen by the user in this page component
  const [currentCity, setCurrentCity] = useState(null);
  
  const handleCitySubmit = (cityName) => {
    // 1. Update the state with the submitted city
    setCurrentCity(cityName);
    

    
    
    // 2. Future implementation: Fetch weather data and clothing suggestions based on the city
    // This could involve calling an API and updating more state variables 

  };

  return (
    <div className="chat-container">
      <h2>Clothing Suggestion Chat</h2>
      
      {/* Render the CityInput component and pass the handler function */}
      <CityInput onSubmit={handleCitySubmit} />

      <hr />

      {/* Display the current status or result */}
      {currentCity ? (
        <div className="suggestions-area">
          <h3>Current City: **{currentCity}**</h3>
        </div>
      ) : (
        <p>Please enter your city to get clothing suggestions.</p>
      )}

    </div>
  );
}

export default Chat;