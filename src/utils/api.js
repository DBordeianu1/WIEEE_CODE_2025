// Get the API key from the environment variables set in .env.local
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

/**
 * Fetches real weather data from OpenWeatherMap.
 * @param {string} city - The name of the city provided by the user.
 * @returns {object} - An object containing temperature and weather condition.
 */
export async function fetchWeatherData(city) {
    if (!API_KEY) {
        throw new Error("OpenWeatherMap API Key is missing. Check your .env.local file.");
    }
    
    // Request temperature in Celsius (units=metric)
    const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;

    try {
        const response = await fetch(url);
        
        
        if (!response.ok) {
            
            const errorData = await response.json();
            if (response.status === 404) {
                throw new Error(`City not found: ${city}`);
            }
            throw new Error(`Weather API error: ${errorData.message}`);
        }

        const data = await response.json();
        
        
        return {
            city: data.name,
            temp: Math.round(data.main.temp), // Round temperature for display
            condition: data.weather[0].main.toLowerCase(), // e.g., 'clouds', 'rain', 'clear'
            description: data.weather[0].description,
            icon: data.weather[0].icon
        };

    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        // Rethrow the error to be caught by the calling component (Chat.jsx)
        throw error;
    }
}

/**
 * Generates clothing suggestions based on the weather object.
 * (This function remains largely the same, but uses the new data structure)
 */
export function getClothingSuggestion(weather, userCloset = {}) {
    const { temp, condition, city } = weather;
    
    let suggestion = `It's **${temp}°C** and **${condition}** in ${city}.`;

    if (temp < 5) {
        suggestion += " **Extremely Cold !** You need winter gear: thermal layers, hat, gloves, and a scarf.";
    } else if (temp <= 12) {
        suggestion += " It's chilly! You'll need **layers**: a warm jacket or coat, sweater, and long pants.";
    } else if (temp <= 22) {
        suggestion += " It's comfortable. A light jacket, jeans, or a sweater is perfect.";
    } else if (temp > 22 && condition === 'Clear') {
        suggestion += " It's **warm and sunny**!Don't forget sunscreen!";
    } else if (condition === 'Rain' || condition === 'Drizzle') {
        suggestion += " Be sure to grab a **raincoat, waterproof shoes, and an umbrella**!";
    } else {
        suggestion += " A simple outfit and a light layer should be fine.";
    }

    return suggestion;
}