<template>
  <RandomWeather/>
  <CityWeather/>
  <WeatherQuiz/>
</template>

<script>
import RandomWeather from './components/RandomWeather.vue'
import CityWeather from './components/CityWeather.vue'
import WeatherQuiz from './components/WeatherQuiz.vue'

export default {
  name: 'App',
  components: {
    RandomWeather,
    CityWeather,
    WeatherQuiz,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
