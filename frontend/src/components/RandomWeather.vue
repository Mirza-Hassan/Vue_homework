<template>
  <div class="container">
    <h2 class="heading">Random Weather</h2>
    <p v-if="loading" class="loading">Loading...</p>
    <p v-if="error" class="alert alert-danger">{{ error }}</p>
    <template v-if="weatherData && weatherData.name">
      <table class="table">
        <tbody>
          <tr>
            <td>Location</td>
            <td>{{ weatherData?.name }}</td>
          </tr>
          <tr>
            <td>Temperature</td>
            <td>{{ weatherData?.main?.temp }}°C</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{{ weatherData?.weather?.[0]?.description }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <p v-else class="alert alert-info">No weather data found for the random location.</p>
    <button @click="fetchRandomWeather" class="btn btn-primary">Get Random Weather</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      error: null,
      weatherData: null,
    };
  },
  methods: {
    async fetchRandomWeather() {
      try {
        this.loading = true;
        this.error = null;
        const url = 'http://localhost:3000/api/random-weather';
        const response = await fetch(url);
        const data = await response.json();
        this.weatherData = data;
      } catch (error) {
        this.error = 'Error fetching weather data';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.heading {
  font-size: 24px;
  margin-bottom: 10px;
}

.loading {
  margin-top: 20px;
}

.alert {
  padding: 10px;
  margin-top: 10px;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border-color: #f5c6cb;
}

.alert-info {
  background-color: #d1ecf1;
  color: #0c5460;
  border-color: #bee5eb;
}

.table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.table td {
  padding: 10px;
  border: 1px solid #dee2e6;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
