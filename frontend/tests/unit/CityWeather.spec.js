import { mount } from '@vue/test-utils';
import CityWeather from '@/components/CityWeather.vue';

describe('CityWeather.vue', () => {
  it('renders without errors', () => {
    const wrapper = mount(CityWeather);
    expect(wrapper.exists()).toBe(true);
  });

  it('displays input field and button', () => {
    const wrapper = mount(CityWeather);
    expect(wrapper.find('.input-field').exists()).toBe(true);
    expect(wrapper.find('.fetch-button').exists()).toBe(true);
  });

  it('displays error message when error is present', async () => {
    const wrapper = mount(CityWeather);
    await wrapper.setData({ error: 'Test error' });
    expect(wrapper.find('.error-message').text()).toBe('Test error');
  });

  it('displays weather data when data is present', async () => {
    const weatherData = {
      name: 'Test City',
      main: { temp: 25 },
      weather: [{ description: 'Sunny' }],
    };

    const wrapper = mount(CityWeather);
    await wrapper.setData({ weatherData });
    
    expect(wrapper.find('.weather-title').text()).toBe(`Weather in ${weatherData.name}`);
    expect(wrapper.find('.weather-info').text()).toBe(`Temperature: ${weatherData.main.temp}°C`);
    expect(wrapper.find('.weather-info:last-child').text()).toBe(`Condition: ${weatherData.weather[0].description}`);
  });

  it('displays jokes when jokes are present', async () => {
    const jokes = [{ value: 'Joke 1' }, { value: 'Joke 2' }];
    const wrapper = mount(CityWeather);
    await wrapper.setData({ jokes });

    expect(wrapper.findAll('.joke-item')).toHaveLength(jokes.length);
  });

});
