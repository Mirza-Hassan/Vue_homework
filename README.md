# Weather Trio

Description: Weather Trio: Random, City, Quiz - Weather at your fingertips.

# Table of Contents

- [Pre Requisites/Setup Instructions](#pre-requisites)
- [API Documentation](#api-documentation)
- [Screenshot/Demo/Live URL](#screenshot)

# Pre Requisites

- Frontend: Vue.js
- Backend: Express, Node.js
- Testing: vue-jest
- Containerization: Docker

# Setup Instructions

1. Clone the repository

2. Build and run your application with Docker Compose:
```
docker-compose up
```
Now, your frontend will be accessible at http://localhost:5000, and your backend will be running on http://localhost:3000.

That's it! You've successfully set up and containerized your application with Docker. 


3. Run your tests using the command:

```
npm run test:unit
```

# API Documentation

This documentation outlines two APIs:

1. **OpenWeatherMap API**
    - **Fetch Weather by City:**
        - **URL**: `http://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}&units=metric`
        - **Method**: GET
        - **Parameters**: 
            - `city` (string, required): The city name for weather data.
            - `apiKey` (string, required): API key for OpenWeatherMap.
        - **Response**: Weather details for the specified city in metric units.

    - **Fetch Random Weather:**
        - **URL**: `http://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={apiKey}&units=metric`
        - **Method**: GET
        - **Parameters**:
            - `latitude` (number, required): Latitude coordinate.
            - `longitude` (number, required): Longitude coordinate.
            - `apiKey` (string, required): API key for OpenWeatherMap.
        - **Response**: Weather data for the specified location in metric units.

2. **Chuck Norris Jokes API**
    - **Fetch Random Chuck Norris Joke:**
        - **URL**: `https://api.chucknorris.io/jokes/random`
        - **Method**: GET
        - **Response**: A random Chuck Norris joke in plain text.

**Note**: Replace `YOUR_OPENWEATHERMAP_API_KEY` with your actual OpenWeatherMap API key when making requests to the OpenWeatherMap API.

# Screenshot
![screenshot](https://github.com/Mirza-Hassan/Vue_homework/assets/17096257/1ddab141-5d11-44ef-a53a-a86a80339ea6)

# Application Flow
[demo.webm](https://github.com/Mirza-Hassan/Vue_homework/assets/17096257/756e0c1b-3711-4d55-9ea7-76cbbab7a90b)

# Live URL 
[https://weather-trio.netlify.app](https://weather-trio.netlify.app/)
