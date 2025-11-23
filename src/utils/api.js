const API_KEY = "467453c81bc94754a9200727252311";
const BASE_URL = "http://api.weatherapi.com/v1/current.json";

/**
 * Fetches real weather data from OpenWeatherMap.
 * @param {string} city - The name of the city provided by the user.
 * @returns {object} - An object containing temperature and weather condition.
 */
export async function fetchWeatherData(city) {
    if (!API_KEY) {
        throw new Error("OpenWeatherMap API Key is missing. Check your .env.local file.");
    }
    
    const url = `${BASE_URL}?q=${city}&key=${API_KEY}`;

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
            city: data.location.region,
            temp: Math.round(data.current.feelslike_c),
            condition: data.current.condition.text.toLowerCase(),
            description: data.current.last_updated,
            icon: data.current.condition.icon,
        };

    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        throw error;
    }
}

/**
 * Generates clothing suggestions based on the weather object.
 * (This function remains largely the same, but uses the new data structure)
 */
export function getClothingSuggestion(weather, userCloset = {}) {
    const { temp, condition, city } = weather;
    
    let suggestion = `It's ${temp}°C and ${condition} in ${city}.`;

    if (temp < 5) {
        suggestion += " Extremely Cold ! You need winter gear: thermal layers, hat, gloves, and a scarf.";
    } else if (temp <= 12) {
        suggestion += " It's chilly! You'll need layers: a warm jacket or coat, sweater, and long pants.";
    } else if (temp <= 22) {
        suggestion += " It's comfortable. A light jacket, jeans, or a sweater is perfect.";
    } else if (temp > 22 && condition === 'Clear') {
        suggestion += " It's warm and sunny!Don't forget sunscreen!";
    } else if (condition === 'Rain' || condition === 'Drizzle') {
        suggestion += " Be sure to grab a raincoat, waterproof shoes, and an umbrella!";
    } else {
        suggestion += " A simple outfit and a light layer should be fine.";
    }

    return suggestion;
}