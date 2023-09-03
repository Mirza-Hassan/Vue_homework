import { mount } from '@vue/test-utils';
import RandomWeather from '../../src/components/RandomWeather.vue';

describe('RandomWeather.vue', () => {
  it('fetches random weather data and displays it', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({
        name: 'City',
        main: { temp: 25 },
        weather: [{ description: 'Sunny' }],
      }),
    });

    const wrapper = mount(RandomWeather);
    await wrapper.vm.fetchRandomWeather();

    expect(wrapper.text()).toContain('City');
    expect(wrapper.text()).toContain('25°C');
    expect(wrapper.text()).toContain('Sunny');
    expect(wrapper.find('.alert-danger').exists()).toBe(false);
  });

  it('displays error message when fetch fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    const wrapper = mount(RandomWeather);
    await wrapper.vm.fetchRandomWeather();

    expect(wrapper.find('.alert-danger').exists()).toBe(true);
    expect(wrapper.find('.alert-danger').text()).toBe('Error fetching weather data');
  });
});
