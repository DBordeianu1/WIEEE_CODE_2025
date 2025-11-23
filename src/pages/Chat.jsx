import React, { useState } from 'react';
import CityInput from '../components/CityInput'; 
import { fetchWeatherData, getClothingSuggestion } from '../utils/api';

function Chat() {
  const [currentCity, setCurrentCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const handleCitySubmit = async (cityName) => {
    setCurrentCity(cityName);
    setWeatherData(null);
    setSuggestion(null);
    setErrorMessage(null); 
    setIsLoading(true);

    try {
        const weather = await fetchWeatherData(cityName);
        
        const clothesSuggestion = getClothingSuggestion(weather);

        setWeatherData(weather);
        setSuggestion(clothesSuggestion);
        
    } catch (error) {
        console.error("Error fetching data:", error);
        
        setErrorMessage(error.message || "An unknown error occurred while getting weather data."); 
    } finally {
        
        setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h2>Clothing Suggestion Chat</h2>
      
      
      <CityInput onSubmit={handleCitySubmit} />

      <hr />

      <div className="suggestions-area">
        
        {isLoading && (
            <p style={{ color: 'blue' }}>Loading weather and suggestions for **{currentCity}**...</p>
        )}
        
        
        {errorMessage && !isLoading && (
            <p style={{ color: 'red', fontWeight: 'bold' }}>🛑 Error: {errorMessage}</p>
        )}
        
        
        {suggestion && !isLoading && !errorMessage && (
            <div>
                <h3>Weather Report for {weatherData.city}:</h3>
                <p>
                    The current temperature is {weatherData.temp}°C with {weatherData.description} skies.
                </p>
                
                <h3>🧥 Suggested Outfit:</h3>
                
                <p dangerouslySetInnerHTML={{ __html: suggestion }} />
            </div>
        )}

        
        {!currentCity && !isLoading && !errorMessage && (
            <p>Please enter your city to get personalized clothing suggestions!</p>
        )}
      </div>
    </div>
  );
}

export default Chat;