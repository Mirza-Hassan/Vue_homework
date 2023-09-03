// controllers/weatherController.js
const fetch = require('node-fetch');

exports.getWeatherData = async (req, res) => {
  const city = req.query.city;
  const apiKey = '6cb6bcbd37a507545af584133dea510f';
  try {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
};

exports.getRandomJoke = async (req, res) => {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching a random joke.' });
  }
};

exports.getRandomWeather = async (req, res) => {
  try {
    const apiKey = '6cb6bcbd37a507545af584133dea510f';
    const { latitude, longitude } = getRandomCoordinates();
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
};

const getRandomCoordinates = () => {
  const latitude = Math.random() * 180 - 90;
  const longitude = Math.random() * 360 - 180;
  return { latitude, longitude };
};
