<template>
  <div class="App">
    <h1 class="app-title">City Weather</h1>
    <div class="input-container">
      <label for="cityInput" class="input-label">Enter a City: </label>
      <input
        type="text"
        id="cityInput"
        v-model="city"
        class="input-field"
        placeholder="City name"
      />
      <button @click="fetchWeatherData" class="fetch-button" :disabled="isSubmitDisabled">Submit</button>
    </div>

    <div v-if="error" class="error-message">{{ error }}</div>

    <div v-if="weatherData && !error" class="weather">
      <h2 class="weather-title">Weather in {{ weatherData?.name }}</h2>
      <p class="weather-info">Temperature: {{ weatherData?.main?.temp }}°C</p>
      <p class="weather-info">Condition: {{ weatherData?.weather?.[0]?.description }}</p>
    </div>

    <div v-if="jokes.length > 0 && !error" class="jokes">
      <div v-for="(joke, index) in jokes" :key="index" class="joke-item">{{ joke.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: '',
      weatherData: null,
      jokes: [],
      error: null
    };
  },
  computed: {
    isSubmitDisabled() {
      return !this.city.trim();
    }
  },
  methods: {
    async fetchWeatherData() {
      try {
        const response = await fetch(`http://localhost:3000/api/weather?city=${this.city}`);
        const data = await response.json();

        if (data.cod === '404') {
          this.error = 'City not found. Please enter a valid city name.';
          this.weatherData = null;
        } else {
          this.error = null;
          this.weatherData = data;
          if (data.weather && data.weather.length > 0) {
            this.fetchRandomJoke(data.weather[0].main);
          }
        }
      } catch (error) {
        // Error fetching weather data
      }
    },
    async fetchRandomJoke() {
      try {
        const response = await fetch('http://localhost:3000/api/jokes');
        const data = await response.json();
        this.jokes = [data];
      } catch (error) {
        console.log('Error fetching joke:', error);
      }
    }
  }
};
</script>

<style scoped>
.App {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
}

.app-title {
  font-size: 28px;
  margin-bottom: 20px;
}

.input-container {
  margin-bottom: 20px;
}

.input-label {
  font-size: 16px;
  margin-right: 10px;
}

.input-field {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.fetch-button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.fetch-button:hover {
  background-color: #0056b3;
}

.fetch-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.weather-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.weather-info {
  font-size: 18px;
  margin-bottom: 5px;
}

.joke-item {
  margin: 10px 0;
  padding: 5px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.jokes {
  margin-top: 20px;
}

.error-message {
  color: red;
  font-size: 16px;
  margin-top: 10px;
}
</style>
