import { mount } from '@vue/test-utils';
import WeatherQuiz from '../../src/components/WeatherQuiz.vue';

describe('WeatherQuiz.vue', () => {
  it('displays the loading message when loading', async () => {
    const wrapper = mount(WeatherQuiz, {
      data() {
        return { loading: true };
      },
    });

    expect(wrapper.find('.loading').exists()).toBe(true);
  });

  it('displays the quiz title when not loading', async () => {
    const wrapper = mount(WeatherQuiz, {
      data() {
        return { loading: false };
      },
    });

    expect(wrapper.find('.quiz-title').exists()).toBe(true);
  });

  it('displays the correct question and options', async () => {
    const questions = [
      {
        question: 'What is the weather condition today?',
        options: ['Sunny', 'Clouds', 'Rainy', 'Snowy'],
        correctAnswer: 'Sunny',
      },
    ];
    const wrapper = mount(WeatherQuiz, {
      data() {
        return { loading: false, questions };
      },
    });

    expect(wrapper.find('.question').text()).toBe(questions[0].question);
    expect(wrapper.findAll('.option-label').length).toBe(questions[0].options.length);
  });

});
