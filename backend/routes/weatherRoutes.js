// routes/weatherRoutes.js
const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/weather', weatherController.getWeatherData);
router.get('/jokes', weatherController.getRandomJoke);
router.get('/random-weather', weatherController.getRandomWeather);

module.exports = router;
