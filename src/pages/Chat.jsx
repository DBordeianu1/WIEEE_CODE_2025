import React, { useState } from 'react';
import CityInput from '../components/CityInput'; 
import { fetchWeatherData, getClothingSuggestion } from '../utils/api';

function Chat() {
  // State to hold the user's input and the API results
  const [currentCity, setCurrentCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // To display API or fetch errors
  
  const handleCitySubmit = async (cityName) => {
    // 1. Reset states and prepare for loading
    setCurrentCity(cityName);
    setWeatherData(null);
    setSuggestion(null);
    setErrorMessage(null); 
    setIsLoading(true);

    try {
        // 2. Fetch the data using the utility function
        const weather = await fetchWeatherData(cityName);
        
        // 3. Generate the clothing suggestion based on the data
        const clothesSuggestion = getClothingSuggestion(weather);

        // 4. Update states upon success
        setWeatherData(weather);
        setSuggestion(clothesSuggestion);
        
    } catch (error) {
        console.error("Error fetching data:", error);
        // 5. Update error state if the fetch fails (e.g., City Not Found, Bad API Key)
        setErrorMessage(error.message || "An unknown error occurred while getting weather data."); 
    } finally {
        // 6. Stop loading regardless of success or failure
        setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h2>Clothing Suggestion Chat</h2>
      
      {/* 1. Renders the input form */}
      <CityInput onSubmit={handleCitySubmit} />

      <hr />

      <div className="suggestions-area">
        {/* 2. Loading Indicator */}
        {isLoading && (
            <p style={{ color: 'blue' }}>Loading weather and suggestions for **{currentCity}**...</p>
        )}
        
        {/* 3. Error Message Display */}
        {errorMessage && !isLoading && (
            <p style={{ color: 'red', fontWeight: 'bold' }}>🛑 Error: {errorMessage}</p>
        )}
        
        {/* 4. Results Display (only shows when suggestion is available and no error) */}
        {suggestion && !isLoading && !errorMessage && (
            <div>
                <h3>Weather Report for {weatherData.city}:</h3>
                <p>
                    The current temperature is **{weatherData.temp}°C** with **{weatherData.description}** skies.
                </p>
                
                <h3>🧥 Suggested Outfit:</h3>
                {/* We use dangerouslySetInnerHTML because the suggestion text contains Markdown-style bolding */}
                <p dangerouslySetInnerHTML={{ __html: suggestion }} />
            </div>
        )}

        {/* 5. Initial Message */}
        {!currentCity && !isLoading && !errorMessage && (
            <p>Please enter your city to get personalized clothing suggestions!</p>
        )}
      </div>
    </div>
  );
}

export default Chat;